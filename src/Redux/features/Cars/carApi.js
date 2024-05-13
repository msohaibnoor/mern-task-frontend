import axiosInstance from "../../interceptor";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addCar = createAsyncThunk("addCar", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.post(apiEndpoint, requestData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const updateCar = createAsyncThunk("updateCar", async ({ apiEndpoint, requestData }, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(apiEndpoint, requestData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const deleteCar = createAsyncThunk("deleteCar", async ({ apiEndpoint, fetchCars }, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(apiEndpoint);
    fetchCars();
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

export const getCar = createAsyncThunk("getCar", async ({ apiEndpoint }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(apiEndpoint);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});

export const getCarCount = createAsyncThunk("getCarCount", async ({ apiEndpoint }, thunkAPI) => {
  try {
    const response = await axiosInstance.get(apiEndpoint);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error?.response?.data);
  }
});
