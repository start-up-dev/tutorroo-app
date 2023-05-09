import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { tutorSlice } from "./tutorSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tutor: tutorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["auth.token"],
      },
    }),
});
