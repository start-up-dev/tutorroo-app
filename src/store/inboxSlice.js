import { createSlice } from "@reduxjs/toolkit";
import { getInboxes, getMessages } from "../api/inbox";

const initialState = {
  inboxes: [],
  messages: [],
  status: "idle",
};

export const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    markAsSeenAll: (state, action) => {
      state.inboxes.map((i) => {
        if (i._id == action.payload) {
          i.numberOfUnSeenMessages = 0;
        }

        return i;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInboxes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInboxes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inboxes = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = [...state.messages, ...action.payload];
      });
  },
});

export const { markAsSeenAll } = inboxSlice.actions;
