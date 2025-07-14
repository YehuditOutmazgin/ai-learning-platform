import mongoose, { Document, Schema } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  categoryId: mongoose.Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISubCategory>('SubCategory', subCategorySchema);
