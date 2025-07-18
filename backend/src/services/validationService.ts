import mongoose from 'mongoose';
import User from '../models/User';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';

//Validates if a string is a valid MongoDB ObjectId

export const isValidMongoId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

//Throws if the userId is not found in DB

export const validateUserExists = async (userId: string) => {
  if (!isValidMongoId(userId)) {
    throw new Error('Invalid user ID');
  }
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
};

// Throws if category is invalid
 
export const validateCategoryExists = async (categoryId: string) => {
  if (!isValidMongoId(categoryId)) {
    throw new Error('Invalid category ID');
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    throw new Error('Category not found');
  }
};

// Throws if subcategory does not belong to category or doesn't exist

export const validateSubCategoryInCategory = async (
  subCategoryId: string,
  categoryId: string
) => {
  if (!isValidMongoId(subCategoryId)) {
    throw new Error('Invalid sub-category ID');
  }
  const sub = await SubCategory.findOne({ _id: subCategoryId, categoryId });
  if (!sub) {
    throw new Error('Sub-category not found or does not match category');
  }
};
