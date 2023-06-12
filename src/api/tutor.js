import Axios from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Search Tutor

export const searchTutor = createAsyncThunk(
  "tutor/searchTutor",
  async (body) => {
    try {
      const res = await Axios.get(`/tutor/details`, {
        params: {
          tuitionType: body?.type,
          subject: body?.subject,
          level: body?.level,
          location: body?.location,
        },
      });
      console.log("Try Search Tutor: " + JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      console.log("Catch Search Tutor: " + JSON.stringify(err.response.data));

      return err.response.data;
    }
  }
);

// Get Subject

export const getSubject = createAsyncThunk("tutor/getSubject", async () => {
  try {
    const res = await Axios.get(`/subject`);
    console.log("Try Get Subject: " + JSON.stringify(res.data.data));
    return res.data.data;
  } catch (err) {
    return err.response.data;
  }
});

// Get Wishlist

export const getWishlist = createAsyncThunk("tutor/getWishlist", async () => {
  try {
    const { data } = await Axios.get(`/wishlist`);
    console.log("Try Get Wishlist: " + JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("Try Get Wishlist: " + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Add To Wishlist

export const addWishlist = createAsyncThunk("tutor/addWishlist", async (id) => {
  try {
    const { data } = await Axios.patch(`/wishlist/add/${id}`);
    console.log("Try Add Wishlist: " + JSON.stringify(data));
    return data;
  } catch (err) {
    console.log("Catch Add Wishlist: " + JSON.stringify(err.response.data));
    return err.response.data;
  }
});

// Remove From Wishlist

export const removeWishlist = createAsyncThunk(
  "tutor/removeWishlist",
  async (id) => {
    try {
      const { data } = await Axios.patch(`/wishlist/remove/${id}`);
      console.log("Try Remove Wishlist: " + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(
        "Catch Remove Wishlist: " + JSON.stringify(err.response.data)
      );
      return err.response.data;
    }
  }
);

// Add Tutor Details

export const addTutorDetails = createAsyncThunk(
  "tutor/addTutorDetails",
  async (body) => {
    try {
      const { data } = await Axios.post(`/tutor/details`, body);
      console.log("Try Add Tutor Details: " + JSON.stringify(data));
      return data;
    } catch (err) {
      console.log(
        "Catch Add Tutor Details: " + JSON.stringify(err.response.data)
      );
      return err.response.data;
    }
  }
);
