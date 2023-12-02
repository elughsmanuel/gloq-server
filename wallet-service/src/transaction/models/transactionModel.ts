import mongoose, { Document, Schema } from 'mongoose';
import { IWallet } from '../../wallet/models/walletModel';
import {
    WALLET_ID_REQUIRED,
    TYPE_REQUIRED,
    AMOUNT_REQUIRED,
    DESCRIPTION_REQUIRED,
    CREDIT,
    DEBIT,
    NIGERIAN_NAIRA, 
} from '../../utils/constants';

export interface ITransaction extends Document {
    wallet: IWallet['_id'];
    type: string;
    amount: number;
    description: string;
}

const transactionSchema = new Schema(
  {
    walletId: {
        type: Schema.Types.ObjectId,
        ref: 'Wallet',
        required: [true, WALLET_ID_REQUIRED],
    },
    type: {
        type: String,
        enum: [CREDIT, DEBIT],
        required: [true, TYPE_REQUIRED],
    },
    amount: {
        type: Number,
        required: [true, AMOUNT_REQUIRED],
    },
    description: {
        type: String,
        required: [true, DESCRIPTION_REQUIRED],
    },
    currency: {
        type: String,
        default: NIGERIAN_NAIRA,
    },
  },
  {
        timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
