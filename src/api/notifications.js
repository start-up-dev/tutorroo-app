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

export const saveExpoPushToken = async (token) => {
  try {
    await Axios.post(`/notifications/save-expo-push-token`, {
      token,
    });

    return true;
  } catch (err) {
    throw err;
  }
};
