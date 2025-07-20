import api from './api';

export const getAllUsers = async () => {
    try {
        const res = await api.get('/users');
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching to get all users: " + (e.message));
    }
}

export const signUp = async (name: string, phone: string) => {
    try {
        const res = await api.post('/auth/signup', { name, phone });
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching אם signup: " + (e.message));
    }
}

export const login = async (name: string, phone: string) => {
    try {
        const res = await api.post('/auth/login', { name, phone });
        return res.data.data;
    } catch (e: any) {
        if (e?.data?.message)
            throw new Error("שם משתמש או מספר טלפון שגויים")
        throw new Error("error fetching login: " + (e?.data?.message || e.message));
    }

}
///////////////////////////////////
export const getAllCategories = async () => {
    try {
        const res = await api.get('/categories/categories');
        return res.data.data;
    } catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get All Categories: " + (e.message));
    }

}
export const addCategory = async (name: string) => {
    try {
        const res = await api.post('/categories/addCategory', { name });
        return res?.data?.success;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get add category: " + (e.message));
    }
}

export const getSubCategoriesInCategories = async (categoryId: string) => {
    try {
        const res = await api.get(`/categories/${categoryId}/subcategories`);
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get subcategories in category: " + (e.message));
    }
}

export const getAllSubCategories = async () => {
    try {
        const res = await api.get('/categories/subcategories');
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get All subcategories: " + (e.message));
    }
}

export const addSubCategory = async (name: string, categoryId: string) => {
    try {
        const res = await api.post('/categories/addSubcategory', { name, categoryId });
        return res?.data?.success;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching to add subcategory: " + (e.message));
    }
}

///////////////////////////////////
export const createPrompt = async (userId: string, categoryId: string, subCategoryId: string, prompt: string) => {
    try {
        const res = await api.post('/prompts', { userId, categoryId, subCategoryId, prompt });
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get create prompt: " + (e.message));
    }
}

export const getUserPrompts = async (userId: string) => {
    try {
        const res = await api.get(`/prompts/get/${userId}`);
        return res.data.data;
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get user prompts : " + (e.message));
    }
}
export const getAllUsersPrompts = async () => {
    try {
        const res = await api.get('/prompts/users');
        return res.data.data
    }
    catch (e: any) {
        if (e?.data?.message)
            throw new Error(e?.data?.message /*"שגיאה בקבלת קטגוריות"*/)
        throw new Error("error fetching get All users prompts: " + (e.message));
    }
}


