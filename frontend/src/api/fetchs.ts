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
        const res = await api.get(`/prompts/${userId}`); // get prompts for user
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
        throw new Error("error fetcing to get all users propmts")
    }
}



// export const signUp = (name: string, phone: string) =>
//   api.post('/users', { name, phone });

// export const fetchSubCategoriesInCategory = async (selectedCategoryId: string) => {
//     if (!selectedCategoryId) return;

//     try {
//         const res = await api.get(`categories/${selectedCategoryId}/subcategories`);
//         // console.log("categoryId: "+selectedCategoryId+" result: "+JSON.stringify( res))
//         return res.data.data;
//     } catch (err) {
//         console.error('error fetching subcategories', err);
//     }
// };
// export const fetchParentCategory = async (selectedSubCategoryId: string) => {
//     if (!selectedSubCategoryId) return;
//     try {
//         const res = await api.get('/subcategories');
//         const sub = res.data.data.find((s: any) => s._id === selectedSubCategoryId);
//         if (sub) {
//             return sub.categoryId;
//         }
//     } catch (err) {
//         console.error('שגיאה באיתור קטגוריה מהתת קטגוריה:', err);
//     }
// };




// // api.get('/users');//get all users
// // api.post('/users'); // create user

// // api.get('/categories/categories'); //get all categories
// // api.get('/categories/subcategories'); //get all subcategories
// // api.post('/categories/addCategory'); // add catogory

// // api.get('/categories/:categoryId/subcategories'); // get all subcategories in category
// // api.post('/categories/addSubcategory'); // add subcategory

// // api.post('/prompts'); //create user prompt
// // api.get('/prompts/:usrId'); // get promps for user
// // api.get('/prompts/users'); // get all prompts

// // api.post('/users/login');// login
