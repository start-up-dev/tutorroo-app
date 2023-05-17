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
      console.log("Try Search" + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log("Catch Search" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Get Subject

export const getSubject = createAsyncThunk("tutor/getSubject", async () => {
  try {
    const res = await Axios.get(`/subject`);
    console.log("Try Subject" + JSON.stringify(res.data));
    return res.data.data;
  } catch (err) {
    console.log("Catch Subject" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});
