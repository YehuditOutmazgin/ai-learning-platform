import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getAllUsers, updateUser, deleteUser } from "../../api/fetchs"
import type { User } from "../../types/user"

interface UserState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
}

export const fetchUsersThunk = createAsyncThunk<User[]>("users/fetchAll", async (_, { rejectWithValue }) => {
  try {
    return await getAllUsers()
  } catch (err: any) {
    return rejectWithValue(err.message)
  }
})

export const updateUserThunk = createAsyncThunk<
  boolean,
  { userId: string; updateData: { name?: string; phone?: string } }
>("users/updateUser", async ({ userId, updateData }, { rejectWithValue, dispatch }) => {
  try {
    await updateUser(userId, updateData)
    dispatch(fetchUsersThunk())
    return true
  } catch (err: any) {
    return rejectWithValue(err.message)
  }
})

export const deleteUserThunk = createAsyncThunk<boolean, string>(
  "users/deleteUser",
  async (userId, { rejectWithValue, dispatch }) => {
    try {
      await deleteUser(userId)
      dispatch(fetchUsersThunk())
      return true
    } catch (err: any) {
      return rejectWithValue(err.message)
    }
  },
)

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearError } = userSlice.actions
export default userSlice.reducer
