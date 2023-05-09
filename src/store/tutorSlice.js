import { createSlice } from "@reduxjs/toolkit";
import { searchTutor } from "../api/tutor";

const initialState = {
  res: null,
  error: null,
  status: "idle",
};

export const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchTutor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchTutor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload;
      });
  },
});

export const {} = tutorSlice.actions;
