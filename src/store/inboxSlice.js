import { createSlice } from "@reduxjs/toolkit";
import { getInboxes, getMessages, sendMessage } from "../api/inbox";

const initialState = {
  inboxes: [],
  messages: [],
  status: "idle",
  selectedRouteId: null,
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

    newMessageReceived: (state, action) => {
      if (state.selectedRouteId == action.payload.routeId) {
        state.messages = [action.payload, ...state.messages];
      } else {
        state.inboxes.map((i) => {
          if (i.routeId == action.payload.routeId) {
            i.numberOfUnSeenMessages = i.numberOfUnSeenMessages + 1;
            i.lastMessage = action.payload;
            i.lastMessageSendAt = Date.now();
          }
          return i;
        });
      }
    },

    messageRequestStatusChanged: (state, action) => {
      state.inboxes.map((i) => {
        if (i.routeId == action.payload.routeId) {
          i.status = action.payload.status;
        }

        return i;
      });
    },

    clearMessages: (state, action) => {
      state.messages = [];
    },

    setSelectedRouteId: (state, action) => {
      state.selectedRouteId = action.payload;
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

export const { markAsSeenAll, newMessageReceived, clearMessages, setSelectedRouteId, messageRequestStatusChanged } = inboxSlice.actions;
