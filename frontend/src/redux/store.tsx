import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import categoryReducer from "./slices/categorySlice";
import promptsReducer from "./slices/promptSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    prompts: promptsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
