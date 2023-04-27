import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL } from "../config/baseURL";

const Axios = axios.create({
  baseURL,
});

// Add a request interceptor
Axios.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    const token = await AsyncStorage.getItem("TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default Axios;
