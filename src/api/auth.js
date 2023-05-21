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

// Register In

export const register = createAsyncThunk("auth/register", async (body) => {
  try {
    const res = await Axios.post(`authenticate/register`, body);
    return res.data;
  } catch (err) {
    console.log("Catch" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Log In

export const login = createAsyncThunk("auth/login", async (body) => {
  try {
    const res = await Axios.post(`/authenticate/login`, body);
    saveJwtToken(res.data.access_token);
    return res.data;
  } catch (err) {
    console.log("Catch" + JSON.stringify(err.response.data));
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
    return res.data;
  } catch (err) {
    console.log("Catch" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});
