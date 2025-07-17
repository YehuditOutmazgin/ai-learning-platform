// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getAllCategories, getAllSubCategories } from '../../api/fetchs';

// export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
//   const res = await getAllCategories();
//   return res;
// });

// export const fetchSubCategories = createAsyncThunk('subcategories/fetch', async () => {
//   const res = await getAllSubCategories();
//   return res;
// });

// const categorySlice = createSlice({
//   name: 'categories',
//   initialState: {
//     categories: [],
//     subcategories: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.categories = action.payload;
//       })
//       .addCase(fetchSubCategories.fulfilled, (state, action) => {
//         state.subcategories = action.payload;
//       });
//   },
// });

// export default categorySlice.reducer;
// redux/slices/categorySlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllCategories, getAllSubCategories } from '../../api/fetchs';

export interface Category {
  _id: string;
  name: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  categoryId: string;
}

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

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetch',
  async () => {
    const res = await getAllCategories();
    return res;
  }
);

export const fetchSubCategories = createAsyncThunk<SubCategory[]>(
  'subcategories/fetch',
  async () => {
    const res = await getAllSubCategories();
    return res;
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action: PayloadAction<SubCategory[]>) => {
        state.subcategories = action.payload;
      });
  },
});

export default categorySlice.reducer;
