import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
