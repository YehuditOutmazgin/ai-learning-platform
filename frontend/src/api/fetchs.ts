import api from "./api"

// Auth APIs
export const signUp = async (name: string, phone: string) => {
  try {
    const res = await api.post("/auth/signup", { name, phone })
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Registration error: " + e.message)
  }
}

export const login = async (name: string, phone: string) => {
  try {
    const res = await api.post("/auth/login", { name, phone })
    return res.data.data
  } catch (e: any) {
    console.log(JSON.stringify(e))
    if (e?.data?.message) throw new Error("Invalid user name or phone number")
    throw new Error("Login error: " + (e?.data?.message || e.message))
  }
}

// User APIs
export const getAllUsers = async () => {
  try {
    const res = await api.get("/users")
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching users: " + e.message)
  }
}

export const updateUser = async (userId: string, updateData: { name?: string; phone?: string }) => {
  try {
    const res = await api.put(`/users/${userId}`, updateData)
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error updating user: " + (e.message || e))
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const res = await api.delete(`/users/${userId}`)
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error deleting user: " + (e.message || e))
  }
}

// Category APIs
export const getAllCategories = async () => {
  try {
    const res = await api.get("/categories/categories")
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching categories: " + e.message)
  }
}

export const addCategory = async (name: string) => {
  try {
    const res = await api.post("/categories/addCategory", { name })
    return res?.data?.success
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error adding category: " + e.message)
  }
}

export const getSubCategoriesInCategories = async (categoryId: string) => {
  try {
    const res = await api.get(`/categories/${categoryId}/subcategories`)
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching subcategories: " + e.message)
  }
}

export const getAllSubCategories = async () => {
  try {
    const res = await api.get("/categories/subcategories")
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching subcategories: " + e.message)
  }
}

export const addSubCategory = async (name: string, categoryId: string) => {
  try {
    const res = await api.post("/categories/addSubcategory", { name, categoryId })
    return res?.data?.success
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error adding subcategory: " + e.message)
  }
}

export const updateCategory = async (categoryId: string, name: string) => {
  try {
    const res = await api.put(`/categories/category/${categoryId}`, { name })
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error updating category: " + (e.message || e))
  }
}

export const deleteCategory = async (categoryId: string) => {
  try {
    const res = await api.delete(`/categories/category/${categoryId}`)
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error deleting category: " + (e.message || e))
  }
}

export const updateSubCategory = async (subCategoryId: string, name: string) => {
  try {
    const res = await api.put(`/categories/subcategory/${subCategoryId}`, { name })
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error updating subcategory: " + (e.message || e))
  }
}

export const deleteSubCategory = async (subCategoryId: string) => {
  try {
    const res = await api.delete(`/categories/subcategory/${subCategoryId}`)
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error deleting subcategory: " + (e.message || e))
  }
}

// Prompt APIs
export const createPrompt = async (userId: string, categoryId: string, subCategoryId: string, prompt: string) => {
  try {
    const res = await api.post("/prompts", { userId, categoryId, subCategoryId, prompt })
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error sending message: " + e.message)
  }
}

export const getUserPrompts = async (userId: string) => {
  try {
    const res = await api.get(`/prompts/get/${userId}`)
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching user conversations: " + e.message)
  }
}

export const getAllUsersPrompts = async () => {
  try {
    const res = await api.get("/prompts/users")
    return res.data.data
  } catch (e: any) {
    if (e?.data?.message) throw new Error(e?.data?.message)
    throw new Error("Error fetching all conversations: " + e.message)
  }
}


export const deletePrompt = async (promptId: string) => {
  try {
    const res = await api.delete(`/prompts/${promptId}`)
    return res.data.data
  } catch (e: any) {
    if (e?.response?.data?.message) throw new Error(e.response.data.message)
    throw new Error("Error deleting conversation: " + (e.message || e))
  }
}
