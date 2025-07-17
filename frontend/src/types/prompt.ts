// export interface Prompt {
//   _id: string;
//   userId: string;
//   categoryId: string;
//   subCategoryId: string;
//   prompt: string;
//   response: string;
//   createdAt: string;
// }
export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  categoryId: Category;
  
}

export interface Prompt {
  _id: string;
  userId: User;
  categoryId: Category;      // לא string אלא אובייקט
  subCategoryId: SubCategory; // לא string אלא אובייקט
  prompt: string;
  response: string;
  createdAt: string;
}
export interface User{
  _id: string,
  name:string,
}