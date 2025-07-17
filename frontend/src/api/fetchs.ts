import api from './api';

const isSucceed = async (res: any): Promise<boolean> => {
    return res?.data?.success ?? false;
}
export const getAllUsers = async () => {
    try {
        const res = await api.get('/users');
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error("error fetching to get all users: " + e.message);
        }
    }
}

export const signUp = async (name: string, phone: string) => {
    try {
        const res = await api.post('/auth/signup', { name, phone });
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to signup")
    }
}

export const login = async (name: string, phone: string) => {
    try {
        const res = await api.post('/auth/login', { name, phone });
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        alert(e)
        if (e instanceof Error) {
        throw new Error("error fetcing to login"+e.message)
    }
}}
///////////////////////////////////
export const getAllCategories = async () => {
    try {
        const res = await api.get('/categories/categories');
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to get all categories")
    }
}
export const addCategory = async (name: string) => {
    try {

        const res = await api.post('/categories/addCategory', { name });
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res?.data?.success;
    }
    catch (e) {
        throw new Error("error fetcing to add category")
    }
}

export const getSubCategoriesInCategories = async (categoryId: string) => {
    try {
        const res = await api.get(`/categories/${categoryId}/subcategories`);
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to get suncategories in category")
    }
}

export const getAllSubCategories = async () => {
    try {
        const res = await api.get('/categories/subcategories');
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to get all subcategories")
    }
}

export const addSubCategory = async (name: string, categoryId: string) => {
    try {
        const res = await api.post('/categories/addSubcategory', { name, categoryId });
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res?.data?.success;
    } catch (e) {
        throw new Error("error fetcing to add subcategory")
    }
}

///////////////////////////////////
export const createPrompt = async (userId: string, categoryId: string, subCategoryId: string, prompt: string) => {
    try {
        const res = await api.post('/prompts', { userId, categoryId, subCategoryId, prompt }); //create user prompt
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to create prompt")
    }
}

export const getUserPrompts = async (userId: string) => {
    try {
        const res = await api.get(`/prompts/get/${userId}`); // get prompts for user
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data;
    } catch (e) {
        throw new Error("error fetcing to get user prompts")
    }
}
export const getAllUsersPrompts = async () => {
    try {
        const res = await api.get('/prompts/users'); // get all prompts
        if (await isSucceed(!res))
            throw new Error("didnt success")
        return res.data.data
    } catch (e) {
            console.error('error fetcing to get all users propmts');

        throw new Error("error fetcing to get all users propmts")
    }
}


