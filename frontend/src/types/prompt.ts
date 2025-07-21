import type { Category } from "./category"
import type { SubCategory } from "./subCategory"
import type { User } from "./user"

export interface Prompt {
  _id: string
  userId: User
  categoryId: Category
  subCategoryId: SubCategory
  prompt: string
  response: string
  createdAt: string
}
