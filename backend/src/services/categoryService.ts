import mongoose from 'mongoose';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { AppError } from '../utils/AppError';
import { isValidMongoId } from './validationService';

export const getAllCategories = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (err) {
        console.error('Error in getAllCategories:', err);
        throw new AppError('Server error', 500);
    }
};

export const getAllSubCategories = async () => {
    try {
        const subCategories = await SubCategory.find().populate('categoryId', 'name');
        return subCategories;
    } catch (err) {
        console.error('Error in getAllSubCategories:', err);
        throw new AppError('Server error', 500);
    }
};

export const getSubCategoriesByCategory = async (categoryId: string) => {
    try {
        if (!categoryId || !isValidMongoId(categoryId)) {
            throw new AppError('Invalid or missing category ID', 400);
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            throw new AppError('Category not found', 404);
        }

        const subCategories = await SubCategory.find({ categoryId }).populate('categoryId', 'name');
            ;
        return subCategories;
    } catch (err) {
        console.error('Error in getSubCategoriesByCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Server error', 500);
    }
};

export const addSubCategory = async (name: string, categoryId: string) => {
    try {
        if (!name || !categoryId || !isValidMongoId(categoryId)) {
            throw new AppError('Missing or invalid sub-category input', 400);
        }

        const category = await Category.findById(categoryId);
        if (!category) throw new AppError('Category does not exist', 404);

        const subCategory = await SubCategory.create({ name, categoryId });
        return subCategory;
    } catch (err) {
        console.error('Error in addSubCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to add sub-category', 500);
    }
};

export const addCategory = async (name: string) => {
    try {
        if (!name || !name.trim()) {
            throw new AppError('Missing new category name', 400);
        }

        const existing = await Category.findOne({ name: name.trim() });
        if (existing) {
            throw new AppError('Category already exists', 409);
        }

        const category = await Category.create({ name: name.trim() });
        return category;
    } catch (err) {
        console.error('Error in addCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to add category', 500);
    }
};
export const updateCategory = async (categoryId: string, newName: string) => {
    try {
        if (!isValidMongoId(categoryId) || !newName.trim()) {
            throw new AppError('Invalid input for category update', 400);
        }

        const category = await Category.findById(categoryId);
        if (!category) throw new AppError('Category not found', 404);

        category.name = newName.trim();
        await category.save();
        return category;
    } catch (err) {
        console.error('Error in updateCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to update category', 500);
    }
};

export const deleteCategory = async (categoryId: string) => {
    try {
        if (!isValidMongoId(categoryId)) {
            throw new AppError('Invalid category ID', 400);
        }

        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) throw new AppError('Category not found', 404);

        // Delete all subcategories that belong to this category
        await SubCategory.deleteMany({ categoryId });

        return { message: 'Category and its subcategories deleted successfully' };
    } catch (err) {
        console.error('Error in deleteCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to delete category', 500);
    }
};

export const updateSubCategory = async (subCategoryId: string, newName: string) => {
    try {
        if (!isValidMongoId(subCategoryId) || !newName.trim()) {
            throw new AppError('Invalid input for sub-category update', 400);
        }

        const subCategory = await SubCategory.findById(subCategoryId);
        if (!subCategory) throw new AppError('Sub-category not found', 404);

        subCategory.name = newName.trim();
        await subCategory.save();
        return subCategory;
    } catch (err) {
        console.error('Error in updateSubCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to update sub-category', 500);
    }
};

export const deleteSubCategory = async (subCategoryId: string) => {
    try {
        if (!isValidMongoId(subCategoryId)) {
            throw new AppError('Invalid sub-category ID', 400);
        }

        const subCategory = await SubCategory.findByIdAndDelete(subCategoryId);
        if (!subCategory) throw new AppError('Sub-category not found', 404);

        return { message: 'Sub-category deleted successfully' };
    } catch (err) {
        console.error('Error in deleteSubCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to delete sub-category', 500);
    }
};
