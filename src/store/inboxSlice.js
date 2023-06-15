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
    addInboxes: (state, action) => {
      state.inboxes = action.payload;
    },
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
        state.messages = [...state.messages, action.payload];
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

    markAllAsSeenByRouteId: (state, action) => {
      state.messages.map((m) => {
        if (m.routeId == action.payload) {
          m.seen = true;
        }

        return m;
      });
    },
    markMessageAsSeenByMessageId: (state, action) => {
      state.messages.map((m) => {
        if (m._id == action.payload) {
          m.seen = true;
        }

        return m;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];

        state.inboxes.map((i) => {
          if (i.routeId == action.payload.routeId) {
            i.numberOfUnSeenMessages = 0;
            i.lastMessage = action.payload;
            i.lastMessageSendAt = Date.now();
          }
          return i;
        });
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

export const { markAsSeenAll, addInboxes, newMessageReceived, clearMessages, setSelectedRouteId, messageRequestStatusChanged, markAllAsSeenByRouteId, markMessageAsSeenByMessageId } =
  inboxSlice.actions;
