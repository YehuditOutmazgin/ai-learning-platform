import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login as loginApi, signUp as signUpApi } from "../../api/fetchs"
import { getUserFromToken, removeToken, setToken } from "../../utils/token"

type AuthState = {
  user: string | null
  role: string | null
  name: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: getUserFromToken()?.userId || null,
  role: getUserFromToken()?.role || null,
  name: getUserFromToken()?.name || null,
  isAuthenticated: !!getUserFromToken(),
  loading: false,
  error: null,
}

export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async ({ name, phone }: { name: string; phone: string }, thunkAPI) => {
    try {
      const res = await signUpApi(name, phone)
      return res
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Signup failed")
    }
  },
)

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ name, phone }: { name: string; phone: string }, thunkAPI) => {
    try {
      const res = await loginApi(name, phone)
      const token = res.token
      setToken(token)
      const userData = getUserFromToken()
      return {
        user: userData?.userId,
        role: userData?.role,
        name: userData?.name,
      }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Login error")
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.role = null
      state.name = null
      state.isAuthenticated = false
      state.error = null
      removeToken()
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload?.user || null
        state.role = action.payload?.role || null
        state.name = action.payload?.name || null
        state.isAuthenticated = true
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpThunk.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
