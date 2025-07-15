import { Error } from 'mongoose';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { AppError } from '../utils/AppError';
export const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (err) {
        throw new AppError('Server error', 450);
    }
};

export const getSubCategoriesByCategory = async (categoryId: string) => {
    try {
        if (!categoryId)
            throw new AppError('Missing required fields', 409);
        const category = await Category.findById(categoryId);
        if (!category)
            throw new AppError('Category not found', 401);
        const subCategories = await SubCategory.find({ categoryId });
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        } else {
            throw new AppError('Server error', 450);
        }
    }

};