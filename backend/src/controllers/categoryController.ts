import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';
import { successResponse } from '../utils/apiResponse';
import { AppError } from '../utils/AppError';


export const getAllCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(successResponse('All categories fetched successfully', categories));
  } catch (error) {
    next(error);
  }
};

export const getAllSubCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAllSubCategories();
    res.status(200).json(successResponse('All sub categories fetched successfully', categories));
  } catch (error) {
    next(error);
  }
};

export const getSubCategoriesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await categoryService.getSubCategoriesByCategory(categoryId);
    res.status(200).json(successResponse('Subcategories fetched successfully', subCategories));
  } catch (error) {
    next(error);
  }
};

export const addSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name ,categoryId } = req.body;
    const subCategory = await categoryService.addSubCategory(name,categoryId)
    res.json({ success: true, message: 'Sub Category added successful', data: subCategory});
  } catch (error) {
    next(error);
  }
};

export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name  } = req.body;
        console.log("insert 1")
    const category=await categoryService.addCategory(name);
    res.json({ success: true, message: 'Category added successful', data: category});
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const updatedCategory = await categoryService.updateCategory(categoryId, name);
    if (!updatedCategory) {
      throw new AppError('Category not found', 404);
    }

    res.json(successResponse('Category updated successfully', updatedCategory));
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categoryId } = req.params;

    const deleted = await categoryService.deleteCategory(categoryId);
    if (!deleted) {
      throw new AppError('Category not found', 404);
    }

    res.json(successResponse('Category deleted successfully', null));
  } catch (error) {
    next(error);
  }
};

export const updateSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {  subCategoryId } = req.params;
    const { name } = req.body;

    const updatedSubCategory = await categoryService.updateSubCategory(subCategoryId, name);
    if (!updatedSubCategory) {
      throw new AppError('Subcategory not found', 404);
    }

    res.json(successResponse('Subcategory updated successfully', updatedSubCategory));
  } catch (error) {
    next(error);
  }
};

export const deleteSubCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { subCategoryId } = req.params;

    const deleted = await categoryService.deleteSubCategory(subCategoryId);
    if (!deleted) {
      throw new AppError('Subcategory not found', 404);
    }

    res.json(successResponse('Subcategory deleted successfully', null));
  } catch (error) {
    next(error);
  }
};
