import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersPrompts, getUserPrompts } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import { Prompt } from '../../types/prompt';

// interface Prompt {
//   _id: string;
//   prompt: string;
//   response: string;
//   userId: string;
//   categoryId: string;
//   subCategoryId: string;
//   createdAt: string;
// }

interface PromptsState {
  prompts: Prompt[];
  loading: boolean;
  error: string | null;
}

const initialState: PromptsState = {
  prompts: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchPrompts = createAsyncThunk<Prompt[]>(
  'prompts/fetchPrompts',
  async (_, { rejectWithValue }) => {
    try {
      const user = getUserFromToken();
      if (user?.role === 'admin') {
        return await getAllUsersPrompts();
      } else if (user?.role === 'user' && user?.userId) {
        return await getUserPrompts(user.userId);
      } else {
        return [];
      }
    } catch (err) {
      return rejectWithValue('שגיאה בטעינת הפרומפטים');
    }
  }
);

// Slice
const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.prompts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default promptsSlice.reducer;
