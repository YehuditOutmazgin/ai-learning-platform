import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService'

export const getAllCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    return res.json(categories);
  }  catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSubCategoriesByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await categoryService.getSubCategoriesByCategory( categoryId);
    return res.json(subCategories);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
