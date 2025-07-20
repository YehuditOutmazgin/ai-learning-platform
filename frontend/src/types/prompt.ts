import { Category } from "./category";
import { SubCategory } from "./subCategory";
import { User } from "./user";

export interface Prompt {
  _id: string;
  userId: User;
  categoryId: Category;      
  subCategoryId: SubCategory; 
  prompt: string;
  response: string;
  createdAt: string;
}
