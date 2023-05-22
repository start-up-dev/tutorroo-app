import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Get Inboxes

export const getNotifications = createAsyncThunk("notification/getNotifications", async () => {
  try {
    const { data } = await Axios.get(`/notifications`, {});

    return data.notifications;
  } catch (err) {
    return [];
  }
});
