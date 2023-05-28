import { createSlice } from "@reduxjs/toolkit";
import {
  addWishlist,
  getSubject,
  getWishlist,
  removeWishlist,
  searchTutor,
} from "../api/tutor";

const initialState = {
  res: null,
  error: null,
  subject: null,
  tutor: null,
  wishlist: null,
  status: "idle",
};

export const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    wishlistRemoved: (state, action) => {
      const index = state.wishlist?.findIndex(
        (obj) => obj.id === action.payload
      );
      if (index !== -1) {
        state.wishlist = state.wishlist?.splice(index, 1);
        console.log("Inside Wishlist: " + JSON.stringify(state.wishlist));
      }

      console.log("New Wishlist: " + JSON.stringify(state.wishlist));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTutor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchTutor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tutor = action.payload;
      })
      .addCase(getSubject.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getSubject.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.subject = action.payload;
      })
      .addCase(getWishlist.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.wishlist = action.payload?.data?.wishlist;
      })
      .addCase(addWishlist.pending, (state, action) => {
        //state.status = "loading";
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload;
      })
      .addCase(removeWishlist.pending, (state, action) => {
        //state.status = "loading";
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload;
      });
  },
});

export const { wishlistRemoved } = tutorSlice.actions;
