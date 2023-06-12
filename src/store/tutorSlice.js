import { createSlice } from "@reduxjs/toolkit";
import {
  addTutorDetails,
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
  subjectObj: null,
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
    clearError: (state, action) => {
      state.error = null;
    },
    clearRes: (state, action) => {
      state.res = null;
    },
    subjects: (state) => {},
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

        const allSubject = action.payload;

        if (allSubject?.length > 0) {
          const subjectArray = allSubject?.map((obj) => obj.name);

          const subjectsObj = subjectArray?.map((value) => {
            return { label: value, value };
          });

          state.subjectObj = subjectsObj;

          console.log("Subjects: " + JSON.stringify(subjectsObj));
        }
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
      })
      .addCase(addTutorDetails.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addTutorDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = action.payload?.issue;
        state.res = action.payload?.message;
      });
  },
});

export const { wishlistRemoved, clearError, clearRes, subjects } =
  tutorSlice.actions;
