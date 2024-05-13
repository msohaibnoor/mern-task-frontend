import { createSlice } from "@reduxjs/toolkit";
import {
    addCar,
    updateCar,
    deleteCar,
    getCars,
    getCar,
    getCarCount
} from "./carApi";
import { toast } from "react-toastify";

export const carSlice = createSlice({
    name: "cars",
    initialState: {
        cars: null,
        car: null,
        carCount: null,
        loading: "idle",
        error: null,
    },
    reducers: {
        clearCar: (state) => {
            state.car = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCar.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(addCar.fulfilled, (state) => {
                state.loading = "succeeded";
                toast.success("Car added successfully");
            })
            .addCase(addCar.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(deleteCar.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(deleteCar.fulfilled, (state) => {
                state.loading = "succeeded";
                toast.success("Car deleted successfully");

            })
            .addCase(deleteCar.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(updateCar.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.user = { ...action.payload.data };
                toast.success("Car updated successfully");
                state.loading = "succeeded";
            })
            .addCase(updateCar.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(getCars.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getCars.fulfilled, (state, action) => {
                console.log(action.payload)
                state.cars = action.payload;
                state.loading = "succeeded";
            })
            .addCase(getCars.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(getCar.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getCar.fulfilled, (state, action) => {
                state.car = action.payload;
                state.loading = "succeeded";
            })
            .addCase(getCar.rejected, (state) => {
                state.loading = "failed";
            })
            .addCase(getCarCount.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(getCarCount.fulfilled, (state, action) => {
                state.carCount = action.payload;
                state.loading = "succeeded";
            })
            .addCase(getCarCount.rejected, (state) => {
                state.loading = "failed";
            });
    },
});

export const { clearCar } = carSlice.actions;

export default carSlice.reducer;
