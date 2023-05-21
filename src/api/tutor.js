import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Search Tutor

export const searchTutor = createAsyncThunk(
  "tutor/searchTutor",
  async (body) => {
    try {
      const res = await Axios.get(
        `/tutor/details?tuitionType=${body.type}&subject=${body.subject}&level=${body.level}`
      );
      console.log("Try Search Tutor: " + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// Get Subject

export const getSubject = createAsyncThunk("tutor/getSubject", async () => {
  try {
    const res = await Axios.get(`/subject`);
    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
});
