import mongoose, {ObjectId, Document, Schema } from 'mongoose';
import { 
    NIGERIAN_NAIRA,
} from '../utils/constants';

export interface IWallet extends Document {
    _id: ObjectId;
    balance: number;
    currency: string;
}

const walletSchema = new Schema(
    {
        userId: {
            type: String,
            required: [true, 'USER_ID_REQUIRED'],
            unique: true,
        },    
        balance: {
            type: Number,
            default: 0,
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

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);

export default Wallet;
