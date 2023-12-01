import mongoose, {ObjectId, Document, Schema } from 'mongoose';
import { IUser } from './userModel';

export interface IWallet extends Document {
    _id: ObjectId;
    user: IUser['_id'];
    balance: number;
    currency: string;
}

const walletSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        currency: {
            type: String,
            default: 'NGN',
        },
    },
    {
        timestamps: true,
    }
);

const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);

export default Wallet;
