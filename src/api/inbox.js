import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Inboxes

export const getInboxes = createAsyncThunk(
  "tutor/getInboxes",
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

export const getMessages = createAsyncThunk("tutor/getMessages", async (args = { routeId, skip: 0, limit: 20 }) => {
  try {
    const { data } = await Axios.get(`/inbox/messages`, {
      params: {
        routeId: args.routeId,
        skip: args.skip,
        limit: args.limit,
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
