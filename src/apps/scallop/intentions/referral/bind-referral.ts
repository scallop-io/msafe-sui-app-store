import { TransactionType } from '@msafe/sui3-utils';
import { SuiClient } from '@mysten/sui.js/client';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { WalletAccount } from '@mysten/wallet-standard';

import { CoreBaseIntention } from '@/apps/msafe-core/intention';
import { SuiNetworks } from '@/types';

import { ScallopClient } from '../../models/scallopClient';
import { TransactionSubType } from '../../types/utils';

export interface BindReferralIntentionData {
  veScaKey: string;
}

export class BindReferralIntention extends CoreBaseIntention<BindReferralIntentionData> {
  txType: TransactionType.Other;

  txSubType: TransactionSubType.BindReferral;

  constructor(public readonly data: BindReferralIntentionData) {
    super(data);
  }

  async build(input: {
    suiClient: SuiClient;
    account: WalletAccount;
    network: SuiNetworks;
  }): Promise<TransactionBlock> {
    const scallopClient = new ScallopClient({
      client: input.suiClient,
      walletAddress: input.account.address,
      networkType: input.network.split(':')[1] as any,
    });
    scallopClient.init();
    return scallopClient.bindReferral(this.data.veScaKey);
  }

  static fromData(data: BindReferralIntentionData): BindReferralIntention {
    return new BindReferralIntention(data);
  }
}