import { createSlice } from "@reduxjs/toolkit";
import { getInboxes, getMessages, sendMessage } from "../api/inbox";

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
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [action.payload, ...state.messages];
      })
      .addCase(getInboxes.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getInboxes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.inboxes = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {})
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export const { markAsSeenAll } = inboxSlice.actions;
