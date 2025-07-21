import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createPrompt, getAllUsersPrompts, getUserPrompts, deletePrompt } from "../../api/fetchs"
import { getUserFromToken } from "../../utils/token"
import type { Prompt } from "../../types/prompt"

interface PromptsState {
  prompts: Prompt[]
  loading: boolean
  error: string | null
}

const initialState: PromptsState = {
  prompts: [],
  loading: false,
  error: null,
}

export const sendPromptThunk = createAsyncThunk<
  Prompt,
  { userId: string; categoryId: string; subCategoryId: string; prompt: string }
>("prompts/createPrompt", async ({ userId, categoryId, subCategoryId, prompt }, { rejectWithValue, dispatch }) => {
  try {
    const res = await createPrompt(userId, categoryId, subCategoryId, prompt)
    const newPrompt=res.data.data
    dispatch(fetchPromptsThunk())
    return newPrompt
  } catch (err: any) {
    return rejectWithValue(err.message)
  }
})

export const fetchPromptsThunk = createAsyncThunk<Prompt[]>("prompts/fetchPrompts", async (_, { rejectWithValue }) => {
  try {
    const user = getUserFromToken()
    if (user?.role === "admin") {
      return await getAllUsersPrompts()
    } else if (user?.role === "user" && user?.userId) {
      return await getUserPrompts(user.userId)
    } else {
      return []
    }
  } catch (err: any) {
    return rejectWithValue(err.message || "Error loading prompts")
  }
})

export const deletePromptThunk = createAsyncThunk<boolean, string>(
  "prompts/deletePrompt",
  async (promptId, { rejectWithValue, dispatch }) => {
    try {
      await deletePrompt(promptId)
      dispatch(fetchPromptsThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromptsThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPromptsThunk.fulfilled, (state, action) => {
        const sorted = action.payload.sort(
          (a: Prompt, b: Prompt) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        state.prompts = sorted
        state.loading = false
      })
      .addCase(fetchPromptsThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(sendPromptThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendPromptThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(sendPromptThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(deletePromptThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deletePromptThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deletePromptThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = promptsSlice.actions
export default promptsSlice.reducer
