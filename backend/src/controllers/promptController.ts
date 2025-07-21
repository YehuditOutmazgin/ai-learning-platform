import { Request, Response, NextFunction } from 'express';
import * as promptService from '../services/promptService';
import { successResponse } from '../utils/apiResponse';

export const createPrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;
    const newPrompt = await promptService.createPrompt(userId, categoryId, subCategoryId, prompt);
    res.status(201).json(successResponse('Prompt created successfully', newPrompt));
  } catch (error) {
    next(error);
  }
};

export const getUserPrompts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getUserPrompts(req.params.userId);
    res.status(200).json(successResponse('User prompts fetched successfully', prompts));
  } catch (error) {
    next(error);
  }
};

export const getUsersPrompts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const prompts = await promptService.getAllUsersPrompts();
    res.status(200).json(successResponse('Users prompts fetched successfully', prompts));
  } catch (error) {
    next(error);
  }
};



export const deletePrompt = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { promptId } = req.params;

    await promptService.deletePrompt(promptId);

    res.status(200).json(successResponse('Prompt deleted successfully'));
  } catch (error) {
    next(error);
  }
};
