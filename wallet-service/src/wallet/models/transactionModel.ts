import mongoose, { Document, Schema } from 'mongoose';
import { IWallet } from './walletModel';

export interface ITransaction extends Document {
  wallet: IWallet['_id'];
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  amount: number;
  description: string;
}

const transactionSchema = new Schema(
  {
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
      required: true,
    },
    type: {
      type: String,
      enum: ['Deposit', 'Withdrawal', 'Transfer'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
