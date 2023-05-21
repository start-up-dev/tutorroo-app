import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Inboxes

export const getInboxes = createAsyncThunk(
  "inbox/getInboxes",
  async (
    args = {
      skip: 0,
      limit: 20,
    }
  ) => {
    try {
      const { data } = await Axios.get(`/inbox`, {
        params: {
          skip: args.skip,
          limit: args.limit,
        },
      });

      return data.inboxes;
    } catch (err) {
      return [];
    }
  }
);

export const getMessages = createAsyncThunk("inbox/getMessages", async (args = { routeId, skip: 0, limit: 20 }) => {
  try {
    const { data } = await Axios.get(`/inbox/messages`, {
      params: {
        routeId: args.routeId,
      },
    });

    return data.messages;
  } catch (err) {
    return [];
  }
});

export const sendMessageRequest = async (participant) => {
  try {
    const { data } = await Axios.post(`/inbox/send-message-request`, {
      participant,
    });

    return data.inbox;
  } catch (err) {
    throw err;
  }
};
export const changeMessageRequestStatus = async (routeId, status) => {
  try {
    const { data } = await Axios.post(`/inbox/change-message-request-status`, {
      routeId,
      status,
    });

    return data.inbox;
  } catch (err) {
    throw err;
  }
};

export const sendMessage = createAsyncThunk("inbox/sendMessage", async (message) => {
  try {
    const { data } = await Axios.post(`/inbox/messages/send`, message);

    return data.message;
  } catch (err) {
    throw err;
  }
});
