import { createSlice } from "@reduxjs/toolkit";
import {
  register,
  login,
  getMe,
  loginWithGoogleBearerToken,
  loginWithApple,
} from "../api/auth";

const initialState = {
  loggedIn: false,
  res: null,
  user: null,
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
      .addCase(loginWithGoogleBearerToken.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithGoogleBearerToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = true;
        state.user = action.payload.user;
        state.res = action.payload;
      })
      .addCase(loginWithApple.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginWithApple.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = true;
        state.user = action.payload.user;
        state.res = action.payload;
      })
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
        state.res = action.payload;
      })
      .addCase(getMe.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      });
  },
});

export const { logIn, logOut } = authSlice.actions;
