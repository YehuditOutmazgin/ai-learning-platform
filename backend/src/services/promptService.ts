import mongoose from 'mongoose';
import Prompt from '../models/Prompt';
import User from '../models/User';
import Category from '../models/Category';
import SubCategory from '../models/SubCategory';
import { AppError } from '../utils/AppError';
import config from '../config/config';

export const createPrompt = async (
    userId: string,
    categoryId: string,
    subCategoryId: string,
    promptText: string
) => {
    try {
        if (!userId || !categoryId || !subCategoryId || !promptText)
            throw new AppError('Missing required fields', 400);

        if (
            !mongoose.isValidObjectId(userId) ||
            !mongoose.isValidObjectId(categoryId) ||
            !mongoose.isValidObjectId(subCategoryId)
        ) {
            throw new AppError('One or more IDs are invalid', 400);
        }

        const trimmedPrompt = promptText.trim();
        if (!trimmedPrompt) throw new AppError('Prompt text cannot be empty', 400);
        if (trimmedPrompt.length > 500) {
            throw new AppError('Prompt is too long. Max 500 characters allowed.', 400);
        }

        const user = await User.findById(userId);
        if (!user) throw new AppError('User not found', 404);

        const category = await Category.findById(categoryId);
        if (!category) throw new AppError('Category not found', 404);

        const subCategory = await SubCategory.findOne({ _id: subCategoryId, categoryId });
        if (!subCategory) {
            throw new AppError('Sub-category does not match the category or does not exist', 400);
        }

        const aiResponse = await openAiGenerate(trimmedPrompt, category.name, subCategory.name);

        const newPrompt = await Prompt.create({
            userId,
            categoryId,
            subCategoryId,
            prompt: trimmedPrompt,
            response: aiResponse,
        });

        return newPrompt;
    } catch (err) {
        console.error('Error in createPrompt:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Failed to create prompt', 500);
    }
};

export const getUserPrompts = async (userId: string) => {
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw new AppError('Invalid user ID', 400);
        }

        const prompts = await Prompt.find({ userId })
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name');
        return prompts;
    } catch (err) {
        console.error('Error in getUserPrompts:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Server error', 500);
    }
};

export const getAllUsersPrompts = async () => {
    try {
        const prompts = await Prompt.find()
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name');
        return prompts;
    } catch (err) {
        console.error('Error in getAllUsersPrompts:', err);
        if (err instanceof AppError) throw err;
        throw new AppError('Server error', 500);
    }
};

// MOCK generator (for dev/testing)
export const mockGenerate = async (
    promptText: string,
    categoryName: string,
    subCategoryName?: string
): Promise<string> => {
    return ` This is a mock lesson about "${promptText}" in the category "${categoryName}"${subCategoryName ? ` and sub-category "${subCategoryName}"` : ''}.`;
};

// OpenAI API generator
export const openAiGenerate = async (
    promptText: string,
    categoryName: string,
    subCategoryName?: string
): Promise<string> => {
    const systemMessage = `You are a friendly and professional educational assistant. Your job is to clearly and thoroughly explain topics in the category of "${categoryName}"${subCategoryName ? `, specifically in "${subCategoryName}"` : ''}.
Always assume that the student's question is relevant to this topic unless it's clearly unrelated. Do not reject valid questions.

Provide a complete, clear, structured explanation with easy-to-understand language for beginner students. The answer should be detailed and span around 12–15 lines. Use short paragraphs or bullet points if needed. 

If, and only if, the question is completely outside the scope of this topic, respond politely that the assistant supports only questions related to this category and recommend choosing a different topic.`;

    const response = await config.openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: promptText },
        ],
        temperature: 0.65,
        max_tokens: 600,
    });

    const aiResponse = response.choices[0]?.message.content?.trim();

    if (!aiResponse) {
        return `מצטער, לא הצלחתי לנסח תשובה מתאימה לשאלתך. נסה לנסח מחדש או לבחור נושא אחר.`;
    }

    return aiResponse;
};






// import Prompt from '../models/Prompt';
// import User from '../models/User';
// import Category from '../models/Category';
// import SubCategory from '../models/SubCategory';
// import { AppError } from '../utils/AppError';
// import config from '../config/config';

// export const createPrompt = async (
//     userId: string,
//     categoryId: string,
//     subCategoryId: string,
//     promptText: string
// ) => {
//     if (!userId || !categoryId || !subCategoryId || !promptText)
//         throw new AppError('Missing required fields');

//     const user = await User.findById(userId);
//     if (!user) throw new AppError('User not found', 404);

//     const category = await Category.findById(categoryId);
//     if (!category) throw new AppError('Category not found', 404);

//     const subCategory = await SubCategory.findOne({ _id: subCategoryId, categoryId });
//     if (!subCategory) {
//         throw new AppError('Sub-category does not match the category or does not exist', 400);
//     }

//     // const aiResponse = await mockGenerate(promptText, category.name, subCategory.name);
//     const aiResponse = await openAiGenerate(promptText, category.name, subCategory.name);

//     const newPrompt = await Prompt.create({
//         userId,
//         categoryId,
//         subCategoryId,
//         prompt: promptText,
//         response: aiResponse,
//     });

//     return newPrompt;
// };

// export const getUserPrompts = async (userId: string) => {
//     try {
//         const prompts = await Prompt.find({ userId })
//             .populate('categoryId', 'name')
//             .populate('subCategoryId', 'name');
//         return prompts;
//     } catch (err) {
//         throw new AppError('Server error', 450);
//     }
// };
// export const getAllUsersPrompts = async () => {
//     try {
//         const prompts = await Prompt.find()
//             .populate('categoryId', 'name')
//             .populate('subCategoryId', 'name');
//         return prompts;
//     } catch (err) {
//         throw new AppError('Server error', 450);
//     }
// };
// //  MOCK
// export const mockGenerate = async (
//     promptText: string,
//     categoryName: string,
//     subCategoryName?: string
// ): Promise<string> => {
//     return ` This is a mock lesson about "${promptText}" in the category "${categoryName}"${subCategoryName ? ` and sub-category "${subCategoryName}"` : ''}.`;
// };

// //  OpenAI API
// export const openAiGenerate = async (
//   promptText: string,
//   categoryName: string,
//   subCategoryName?: string
// ): Promise<string> => {
//   const systemMessage = `You are a friendly and professional educational assistant. Your job is to clearly and thoroughly explain topics in the category of "${categoryName}"${subCategoryName ? `, specifically in "${subCategoryName}"` : ''}.
// Always assume that the student's question is relevant to this topic unless it's clearly unrelated. Do not reject valid questions.

// Provide a complete, clear, structured explanation with easy-to-understand language for beginner students. The answer should be detailed and span around 12–15 lines. Use short paragraphs or bullet points if needed.

// If, and only if, the question is completely outside the scope of this topic, respond politely that the assistant supports only questions related to this category and recommend choosing a different topic.`;

//   const response = await config.openAI.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       { role: 'system', content: systemMessage },
//       { role: 'user', content: promptText },
//     ],
//     temperature: 0.65,
//     max_tokens: 600,
//   });

//   const aiResponse = response.choices[0]?.message.content?.trim();

//   if (!aiResponse) {
//     return `מצטער, לא הצלחתי לנסח תשובה מתאימה לשאלתך. נסה לנסח מחדש או לבחור נושא אחר.`;
//   }

//   return aiResponse;
// };

