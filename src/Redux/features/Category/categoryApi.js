import axiosInstance from "../../interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCategory = createAsyncThunk("addCategory", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiEndpoint, requestData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const updateCategory = createAsyncThunk("updateCategory", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(apiEndpoint, requestData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const deleteCategory = createAsyncThunk("deleteCategory", async ({ apiEndpoint, fetchCategories }, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(apiEndpoint);
    fetchCategories();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const getCars = createAsyncThunk("getCars", async ({ apiEndpoint }, thunkAPI) => {
  try {
    console.log("<<<<");
    const response = await axiosInstance.get(apiEndpoint);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const getCategory = createAsyncThunk("getCategory", async ({ apiEndpoint }, thunkAPI) => {
  try {
    console.log("<<<<");
    const response = await axiosInstance.get(apiEndpoint);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});
