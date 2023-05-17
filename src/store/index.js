import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { tutorSlice } from "./tutorSlice";
import { inboxSlice } from "./inboxSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tutor: tutorSlice.reducer,
    inbox: inboxSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["auth.token"],
      },
    }),
});
