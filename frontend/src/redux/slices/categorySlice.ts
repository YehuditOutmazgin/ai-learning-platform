import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import {
  getAllCategories,
  getAllSubCategories,
  addCategory,
  addSubCategory,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
  getSubCategoriesInCategories,
} from "../../api/fetchs"
import type { Category } from "../../types/category"
import type { SubCategory } from "../../types/subCategory"

interface CategoryState {
  categories: Category[]
  subcategories: SubCategory[]
  loading: boolean
  error: string | null
}

const initialState: CategoryState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
}

export const fetchCategoriesThunk = createAsyncThunk<Category[]>(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCategories()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const fetchSubCategoriesThunk = createAsyncThunk<SubCategory[]>(
  "subcategories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllSubCategories()
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const fetchSubCategoriesByCategoryThunk = createAsyncThunk<SubCategory[], string>(
  "subcategories/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      return await getSubCategoriesInCategories(categoryId)
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const addCategoryThunk = createAsyncThunk<boolean, { name: string }>(
  "categories/addCategory",
  async ({ name }, { rejectWithValue, dispatch }) => {
    try {
      const success = await addCategory(name)
      if (success) {
        dispatch(fetchCategoriesThunk())
      }
      return success
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const addSubCategoryThunk = createAsyncThunk<boolean, { name: string; categoryId: string }>(
  "subcategories/addSubCategory",
  async ({ name, categoryId }, { rejectWithValue, dispatch }) => {
    try {
      const success = await addSubCategory(name, categoryId)
      if (success) {
        dispatch(fetchSubCategoriesThunk())
      }
      return success
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const updateCategoryThunk = createAsyncThunk<boolean, { categoryId: string; name: string }>(
  "categories/updateCategory",
  async ({ categoryId, name }, { rejectWithValue, dispatch }) => {
    try {
      await updateCategory(categoryId, name)
      dispatch(fetchCategoriesThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const updateSubCategoryThunk = createAsyncThunk<boolean, { subCategoryId: string; name: string }>(
  "subcategories/updateSubCategory",
  async ({ subCategoryId, name }, { rejectWithValue, dispatch }) => {
    try {
      await updateSubCategory(subCategoryId, name)
      dispatch(fetchSubCategoriesThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const deleteCategoryThunk = createAsyncThunk<boolean, string>(
  "categories/deleteCategory",
  async (categoryId, { rejectWithValue, dispatch }) => {
    try {
      await deleteCategory(categoryId)
      dispatch(fetchCategoriesThunk())
      dispatch(fetchSubCategoriesThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

export const deleteSubCategoryThunk = createAsyncThunk<boolean, string>(
  "subcategories/deleteSubCategory",
  async (subCategoryId, { rejectWithValue, dispatch }) => {
    try {
      await deleteSubCategory(subCategoryId)
      dispatch(fetchSubCategoriesThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false
        state.categories = action.payload
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchSubCategoriesThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSubCategoriesThunk.fulfilled, (state, action: PayloadAction<SubCategory[]>) => {
        state.loading = false
        state.subcategories = action.payload
      })
      .addCase(fetchSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = categorySlice.actions
export default categorySlice.reducer
