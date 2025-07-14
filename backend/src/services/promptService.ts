import Prompt from '../models/Prompt';
import User from '../models/User';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';

export const createPrompt = async (
  userId: string,
  categoryId: string,
  subCategoryId: string,
  promptText: string
) => {
  // ולידציות
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const category = await Category.findById(categoryId);
  if (!category) throw new Error('Category not found');

  const subCategory = await SubCategory.findOne({ _id: subCategoryId, categoryId });
  if (!subCategory) {
    throw new Error('Sub-category does not match the category or does not exist');
  }

  // תגובה מדומה
  const response = `📘 This is a mock lesson about: "${promptText}"`;

  const newPrompt = await Prompt.create({
    userId,
    categoryId,
    subCategoryId,
    prompt: promptText,
    response,
  });

  return newPrompt;
};

export const getUserPrompts = async (userId: string) => {
  const prompts = await Prompt.find({ userId })
    .populate('categoryId', 'name')
    .populate('subCategoryId', 'name');
  return prompts;
};
