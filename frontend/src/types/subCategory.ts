import type { Category } from "./category"

export interface SubCategory {
  _id: string
  name: string
  categoryId: Category
}
