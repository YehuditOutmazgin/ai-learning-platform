import { Request, Response, NextFunction } from 'express';
import * as categoryService from '../services/categoryService';
import { successResponse } from '../utils/apiResponse';

export const getAllCategories = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(successResponse('All categories fetched successfully', categories));
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
