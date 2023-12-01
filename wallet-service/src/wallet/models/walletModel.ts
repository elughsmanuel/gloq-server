import mongoose, {ObjectId, Document, Schema } from 'mongoose';
import validator from 'validator';
import { 
    USERNAME_REQUIRED,
    EMAIL_REQUIRED,
    VALID_EMAIL,
} from '../../utils/constants';

export interface IWallet extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    balance: number;
    currency: string;
}

const walletSchema = new Schema(
    {
    username: {
        type: String,
        required: [true, USERNAME_REQUIRED],
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, EMAIL_REQUIRED],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, VALID_EMAIL],
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
