import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Store Data to AsyncStorage

const storeData = async (value) => {
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
    console.log("Try" + JSON.stringify(res.data));
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
    storeData(res.data.access_token);
    console.log("Try" + res.data);
    return res.data;
  } catch (err) {
    console.log("Catch" + JSON.stringify(err.response.data));
    return err.response.data;
  }
});
