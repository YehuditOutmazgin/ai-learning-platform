// //mock
// import { Request, Response } from 'express';
// import Prompt from '../models/Prompt';
// import {
//   validateUserExists,
//   validateCategoryExists,
//   validateSubCategoryInCategory,
// } from '../services/validationService';
// // MOCK ONLY – no OpenAI import needed

// export const createPrompt = async (req: Request, res: Response) => {
//   try {const { userId, categoryId, subCategoryId, prompt } = req.body;

//     await validateUserExists(userId);
//     await validateCategoryExists(categoryId);
//     await validateSubCategoryInCategory(subCategoryId, categoryId);

//     const responseText = `📘 This is a mock lesson about: "${prompt}"`;

//     const saved = await Prompt.create({
//       userId,
//       categoryId,
//       subCategoryId,
//       prompt,
//       response: responseText,
//     });

//     res.status(201).json(saved);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }} 
// ;

// export const getUserPrompts = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const prompts = await Prompt.find({ userId }).sort({ createdAt: -1 });
//     return res.json(prompts);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };

// //with open AI

// // import { Request, Response } from 'express';
// // import Prompt from '../models/Prompt';
// // import { Configuration, OpenAIApi } from 'openai';
// // import config from '../config/config';

// // // Initialize OpenAI
// // const openai = new OpenAIApi(new Configuration({ apiKey: config.openaiApiKey }));

// // export const createPrompt = async (req: Request, res: Response) => {
// //   try {
// //     const { userId, categoryId, subCategoryId, prompt } = req.body;

// //     if (!userId || !categoryId || !subCategoryId || !prompt) {
// //       return res.status(400).json({ message: 'Missing required fields' });
// //     }

// //     // 🧠 Send prompt to OpenAI
// //     const openaiResponse = await openai.createChatCompletion({
// //       model: 'gpt-3.5-turbo',
// //       messages: [{ role: 'user', content: prompt }],
// //     });

// //     const responseText = openaiResponse.data.choices[0].message?.content || '';

// //     // 💾 Save to DB
// //     const saved = await Prompt.create({
// //       userId,
// //       categoryId,
// //       subCategoryId,
// //       prompt,
// //       response: responseText,
// //     });

// //     return res.status(201).json(saved);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // export const getUserPrompts = async (req: Request, res: Response) => {
// //   try {
// //     const { userId } = req.params;
// //     const prompts = await Prompt.find({ userId }).sort({ createdAt: -1 });
// //     return res.json(prompts);
// //   } catch (err) {
// //     console.error(err);
// //     return res.status(500).json({ message: 'Server error' });
// //   }
// // };

import { Request, Response } from 'express';
import * as promptService from '../services/promptService';

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { userId, categoryId, subCategoryId, prompt } = req.body;
    const newPrompt = await promptService.createPrompt(userId, categoryId, subCategoryId, prompt);
    res.status(201).json(newPrompt);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const prompts = await promptService.getUserPrompts(req.params.userId);
    res.json(prompts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
