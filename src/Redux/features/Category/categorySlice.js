import { createSlice } from "@reduxjs/toolkit";
import { updateCategory, deleteCategory, getCars, addCategory, getCategory } from "./categoryApi";
import { toast } from "react-toastify";

export const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    category: null,
    loading: "idle",
    error: null
  },
  reducers: {
    clearCategory: (state) => {
      state.category = null;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = "succeeded";
        toast.success("Category added successfully");
      })
      .addCase(addCategory.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.category = { ...action.payload.data };
        state.loading = "succeeded";
      })
      .addCase(updateCategory.rejected, (state) => {
        state.loading = "failed";
      })
      .addCase(getCars.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(getCars.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cars = action.payload;
        state.loading = "succeeded";
      })
      .addCase(getCars.rejected, (state) => {
        state.loading = "failed";
      });
  }
});

export const { clearCategory } = categorySlice.actions;

export default categorySlice.reducer;
