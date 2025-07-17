import mongoose from 'mongoose';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { AppError } from '../utils/AppError';

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
        const subCategories = await SubCategory.find();
        return subCategories;
    } catch (err) {
        console.error('Error in getAllSubCategories:', err);
        throw new AppError('Server error', 500);
    }
};

export const getSubCategoriesByCategory = async (categoryId: string) => {
    try {
        if (!categoryId || !mongoose.isValidObjectId(categoryId)) {
            throw new AppError('Invalid or missing category ID', 400);
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            throw new AppError('Category not found', 404);
        }

        const subCategories = await SubCategory.find({ categoryId });
        return subCategories;
    } catch (err) {
        console.error('Error in getSubCategoriesByCategory:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Server error', 500);
    }
};

export const addSubCategory = async (name: string, categoryId: string) => {
    try {
        if (!name || !categoryId || !mongoose.isValidObjectId(categoryId)) {
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


// import { Error } from 'mongoose';
// import Category from '../models/Category';
// import SubCategory from '../models/SubCategory';
// import { AppError } from '../utils/AppError';
// export const getAllCategories = async () => {
//     try {
//         const categories = await Category.find();
//         return categories;
//     } catch (err) {
//         throw new AppError('Server error', 450);
//     }
// };
// export const getAllSubCategories = async () => {
//     try {
//         const categories = await SubCategory.find();
//         return categories;
//     } catch (err) {
//         throw new AppError('Server error', 450);
//     }
// };
// export const getSubCategoriesByCategory = async (categoryId: string) => {
//     try {
//         if (!categoryId)
//             throw new AppError('Missing required fields', 409);
//         const category = await Category.findById(categoryId);
//         if (!category)
//             throw new AppError('Category not found', 401);
//         const subCategories = await SubCategory.find({ categoryId });
//         return subCategories;
//     } catch (err) {
//         if (err instanceof AppError) {
//             throw err;
//         } else {
//             throw new AppError('Server error', 450);
//         }
//     }

// };
// export const addSubCategory = async (name: string, categoryId: string) => {

//     const category = await Category.findOne({ categoryId });
//     if (!category) throw new AppError('Sub Category added faild', 404);
//     const subCategory = await SubCategory.create({
//         name,
//         categoryId
//     })
//     return subCategory;
// };
// export const addCategory = async (name: string) => {

//     if (!name)
//         throw new AppError("Missing new category name", 500)
//     const checkCategory = await Category.find({ name });
//     console.log(checkCategory.length)
//     if (checkCategory.length > 0)
//         throw new AppError("Category already exist", 400)
//     const category = await Category.create({ name });
//     console.log(category)
//     if (!category) throw new AppError('Category added faild', 404);
//     return category;
// };
