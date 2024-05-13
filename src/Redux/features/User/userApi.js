import axiosInstance from "../../interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("login", async ({ apiEndpoint, requestData, navigate }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiEndpoint, requestData);
    navigate("/dashboard");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ statusCode: error.response.status });
  }
});

export const logout = createAsyncThunk("logout", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiEndpoint, requestData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const signUp = createAsyncThunk("signUp", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiEndpoint, requestData);
    return response.data.data.email;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});
