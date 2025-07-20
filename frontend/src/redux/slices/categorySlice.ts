import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getAllCategories,
  getAllSubCategories,
  addCategory,
  addSubCategory,
} from '../../api/fetchs';
import { Category } from '../../types/category';
import { SubCategory } from '../../types/subCategory';


interface CategoryState {
  categories: Category[];
  subcategories: SubCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
};

// FETCH ALL CATEGORIES
export const fetchCategoriesThunk = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCategories();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// FETCH ALL SUBCATEGORIES
export const fetchSubCategoriesThunk = createAsyncThunk<SubCategory[]>(
  'subcategories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllSubCategories();
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD CATEGORY
export const addCategoryThunk = createAsyncThunk<boolean, { name: string }>(
  'categories/addCategory',
  async ({ name }, { rejectWithValue, dispatch }) => {
    try {
      const success = await addCategory(name);
      if (success) {
        dispatch(fetchCategoriesThunk()); // ריענון רשימה
      }
      return success;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

// ADD SUBCATEGORY
export const addSubCategoryThunk = createAsyncThunk<boolean, { name: string; categoryId: string }>(
  'subcategories/addSubCategory',
  async ({ name, categoryId }, { rejectWithValue, dispatch }) => {
    try {
      const success = await addSubCategory(name, categoryId);
      if (success) {
        dispatch(fetchSubCategoriesThunk()); // ריענון רשימה
      }
      return success;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSubCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategoriesThunk.fulfilled, (state, action: PayloadAction<SubCategory[]>) => {
        state.loading = false;
        state.subcategories = action.payload;
      })
      .addCase(fetchSubCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addSubCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategoryThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addSubCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
