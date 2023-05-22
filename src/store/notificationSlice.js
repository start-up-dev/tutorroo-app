import { createSlice } from "@reduxjs/toolkit";
import { getNotifications } from "../api/notifications";

const initialState = {
  notifications: [],
  status: "idle",
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notifications = action.payload;
      })
      .addCase(getNotifications.pending, (state, action) => {
        state.status = "loading";
      });
  },
});

export const {} = notificationSlice.actions;
