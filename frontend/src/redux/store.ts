import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import categoryReducer from "./slices/categorySlice"
import promptReducer from "./slices/promptSlice"
import userReducer from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    prompts: promptReducer,
    users: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
