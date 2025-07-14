import mongoose, { Document, Schema } from 'mongoose';

export interface IPrompt extends Document {
  userId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  subCategoryId: mongoose.Types.ObjectId;
  prompt: string;
  response: string;
  createdAt: Date;
}

const promptSchema = new Schema<IPrompt>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    prompt: { type: String, required: true },
    response: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IPrompt>('Prompt', promptSchema);
