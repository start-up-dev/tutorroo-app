import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { tutorSlice } from "./tutorSlice";
import { inboxSlice } from "./inboxSlice";
import { notificationSlice } from "./notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tutor: tutorSlice.reducer,
    inbox: inboxSlice.reducer,
    notification: notificationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["auth.token"],
      },
    }),
});
