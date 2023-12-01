import mongoose, {ObjectId, Document, Schema } from 'mongoose';

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
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
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
