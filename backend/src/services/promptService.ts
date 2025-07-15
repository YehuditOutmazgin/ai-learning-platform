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
//     if (!user) throw new AppError('User not found', 400);

//     const category = await Category.findById(categoryId);
//     if (!category) throw new AppError('Category not found', 401);

//     const subCategory = await SubCategory.findOne({ _id: subCategoryId, categoryId });
//     if (!subCategory) {
//         throw new AppError('Sub-category does not match the category or does not exist', 402);
//     }

//     // // mock
//     // const response = `📘 This is a mock lesson about: "${promptText}"`;

//     //ai
//     const systemMessage = `You are a helpful educational assistant. 
//     Your only role is to teach and explain topics in the field of "${category?.name}"${subCategory?.name ? ` 
//         and specifically in "${subCategory.name}"` : ''}. Please give a clear and structured explanation for 
//         students. Do not respond to anything outside this domain.`;
//     const response = await config.openAI.chat.completions.create({
//         model: 'gpt-3.5-turbo',
//         messages: [
//             { role: 'system', content: systemMessage },
//             { role: 'user', content: promptText },
//         ],
//         temperature: 0.7,
//         max_tokens: 600,
//     });

//     const aiResponse = response.choices[0]?.message.content?.trim();
//     if (!aiResponse) throw new AppError('No response from OpenAI');
//     //end of ai

//     const newPrompt = await Prompt.create({
//         userId,
//         categoryId,
//         subCategoryId,
//         prompt: promptText,
//         response,
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
    if (!userId || !categoryId || !subCategoryId || !promptText)
        throw new AppError('Missing required fields');

    const user = await User.findById(userId);
    if (!user) throw new AppError('User not found', 400);

    const category = await Category.findById(categoryId);
    if (!category) throw new AppError('Category not found', 401);

    const subCategory = await SubCategory.findOne({ _id: subCategoryId, categoryId });
    if (!subCategory) {
        throw new AppError('Sub-category does not match the category or does not exist', 402);
    }

    // const aiResponse = await mockGenerate(promptText, category.name, subCategory.name);
    // const aiResponse = await geminiGenerate(promptText, category.name, subCategory.name);
    const aiResponse = await openAiGenerate(promptText, category.name, subCategory.name);

    const newPrompt = await Prompt.create({
        userId,
        categoryId,
        subCategoryId,
        prompt: promptText,
        response: aiResponse,
    });

    return newPrompt;
};

export const getUserPrompts = async (userId: string) => {
    try {
        const prompts = await Prompt.find({ userId })
            .populate('categoryId', 'name')
            .populate('subCategoryId', 'name');
        return prompts;
    } catch (err) {
        throw new AppError('Server error', 450);
    }
};

//  MOCK (לצורכי פיתוח)
export const mockGenerate = async (
    promptText: string,
    categoryName: string,
    subCategoryName?: string
): Promise<string> => {
    return ` This is a mock lesson about "${promptText}" in the category "${categoryName}"${subCategoryName ? ` and sub-category "${subCategoryName}"` : ''}.`;
};

//  OpenAI API
export const openAiGenerate = async (
    promptText: string,
    categoryName: string,
    subCategoryName?: string
): Promise<string> => {
    const systemMessage = `You are a helpful educational assistant. Your only role is to teach and explain topics in the field of "${categoryName}"${subCategoryName ? ` and specifically in "${subCategoryName}"` : ''}. Please give a clear and structured explanation for students. Do not respond to anything outside this domain.`;

    const response = await config.openAI.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: promptText },
        ],
        temperature: 0.7,
        max_tokens: 600,
    });

    const aiResponse = response.choices[0]?.message.content?.trim();
    if (!aiResponse) throw new AppError('No response from OpenAI');
    return aiResponse;
};

//  Gemini API (Google)
export const geminiGenerate = async (
    promptText: string,
    categoryName: string,
    subCategoryName?: string
): Promise<string> => {
    const instruction = `You are a helpful educational assistant. You only teach topics in "${categoryName}"${subCategoryName ? `, specifically "${subCategoryName}"` : ''}. Answer clearly and only about this topic.`;

    const model = config.geminiAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent({ contents:
        [{  role: 'user',
            parts: 
            [{ text: `${instruction}\n\n${promptText}` }]
        }]});

    const aiResponse = result.response.text().trim();
    if (!aiResponse) throw new AppError('No response from Gemini AI');
    return aiResponse;
};