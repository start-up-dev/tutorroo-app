import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Store Data to AsyncStorage

const saveJwtToken = async (value) => {
  try {
    await AsyncStorage.setItem("TOKEN", value);
  } catch (e) {
    console.log(e);
  }
};

// Node Register

export const register = createAsyncThunk("auth/register", async (body) => {
  try {
    const res = await Axios.post(`authenticate/register`, body);
    console.log("Try Register" + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log("Catch Register" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Node Log In

export const login = createAsyncThunk("auth/login", async (body) => {
  try {
    const res = await Axios.post(`/authenticate/login`, body);
    saveJwtToken(res.data.access_token);
    console.log("Try Log In" + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log("Catch Log In" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Node Verify Account

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async (body) => {
    try {
      const res = await Axios.patch(`/authenticate/verify_account`, body);
      console.log("Try Verify Account" + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log("Catch Verify Account" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Node Resend OTP

export const resendOTP = createAsyncThunk("auth/resendOTP", async (body) => {
  try {
    const res = await Axios.post(`/authenticate/resend_code`, body);
    console.log("Try Resend Code" + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log("Catch Resend Code" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Log In With Google

export const loginWithGoogleBearerToken = createAsyncThunk(
  "auth/login-with-google-bearer-token",
  async (token) => {
    try {
      const { data } = await Axios.post(
        `/authenticate/login-with-google-bearer-token`,
        {
          bearerToken: token,
        }
      );
      saveJwtToken(data.token);
      return data;
    } catch (err) {
      console.log("Catch" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Log In With Apple

export const loginWithApple = createAsyncThunk(
  "auth/login-with-apple",
  async (body) => {
    try {
      const { data } = await Axios.post(
        `/authenticate/login-with-apple-identity-token`,
        body
      );
      saveJwtToken(data.token);
      return data;
    } catch (err) {
      return err.response.data;
    }
  }
);

// Get Me

export const getMe = createAsyncThunk("auth/getMe", async () => {
  try {
    const res = await Axios.get(`/authenticate/me`);
    console.log("Try Get Me" + JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    console.log("Catch Get Me" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Update Profile

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (body) => {
    try {
      const res = await Axios.patch(`/authenticate/update_profile`, body);
      console.log("Try Update Profile" + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log("Catch Update Profile" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Change Password

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (body) => {
    try {
      const { data } = await Axios.post(`/authenticate/change_password`, body);
      console.log("Try Change Password" + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log("Catch Change Password" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Forgot Password

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (body) => {
    try {
      const { data } = await Axios.post(`/authenticate/forget_password`, body);
      console.log("Try Forgot Password" + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log("Catch Forgot Password" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);

// Reset Password

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (body) => {
    try {
      const { data } = await Axios.post(`/authenticate/reset_password`, body);
      console.log("Try Reset Password" + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log("Catch Reset Password" + JSON.stringify(err.response.data));
      return err.response.data;
    }
  }
);
