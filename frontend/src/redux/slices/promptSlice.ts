import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsersPrompts, getUserPrompts } from '../../api/fetchs';
import { getUserFromToken } from '../../utils/token';
import { Prompt } from '../../types/prompt';


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

export const fetchPromptsThunk = createAsyncThunk<Prompt[]>(
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

const promptsSlice = createSlice({
  name: 'prompts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromptsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromptsThunk.fulfilled, (state, action) => {
        state.prompts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPromptsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default promptsSlice.reducer;
