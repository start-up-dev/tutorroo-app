import { createSlice } from "@reduxjs/toolkit";
import { register, login } from "../api/auth";

const initialState = {
  loggedIn: false,
  res: null,
  error: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.loggedIn = true;
    },
    logOut: (state, action) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;

        if (action.payload?.access_token) {
          state.loggedIn = true;
        }
      });
  },
});

export const { logIn, logOut } = authSlice.actions;
