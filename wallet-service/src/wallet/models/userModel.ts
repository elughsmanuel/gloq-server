import mongoose, {ObjectId, Document, Schema } from 'mongoose';
import validator from 'validator';
import { 
    USERNAME_REQUIRED,
    EMAIL_REQUIRED,
    VALID_EMAIL,
} from '../../utils/constants';

export interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    balance: number;
    currency: string;
}

const userSchema = new Schema(
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

const User = mongoose.model<IUser>('User', userSchema);

export default User;
