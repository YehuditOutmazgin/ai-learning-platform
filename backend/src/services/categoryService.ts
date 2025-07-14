import { Error } from 'mongoose';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
export const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (err) {
        throw new Error('Server error');
    }
};

export const getSubCategoriesByCategory = async (categoryId: string) => {
    try {
        const category = await Category.findById(categoryId);
        if (!category)
            throw new Error('Category not found');
        const subCategories = await SubCategory.find({ categoryId });
        return subCategories;
    } catch (err) {
        throw new Error('Server error');
    }
};