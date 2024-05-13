import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signUp } from "./userApi";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isGuest: false,
    loading: false,
    error: null
  },
  reducers: {
    customLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("payloaddd");
        console.log(action.payload);
        state.loading = "succeeded";
        state.isGuest = false;
        state.user = { ...action.payload.user, tokens: action.payload.tokens };
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload.error;
      })
      .addCase(logout.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = "succeeded";
        state.user = null;
        state.shownAppModal = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = "failed";
        state.user = null;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.email = action.payload;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = "failed";
      });
  }
});

export const { customLogout } = userSlice.actions;

export default userSlice.reducer;
