import { thunk } from "redux-thunk";
import userSlice from "./features/User/userSlice.js";
import carSlice from "./features/Cars/carSlice.js";
import categorySlice from "./features/Category/categorySlice.js";
import { configureStore, combineReducers, applyMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userSlice,
  cars: carSlice,
  categories: categorySlice
});
const persistConfig = {
  key: "root",
  storage
  // Optionally whitelist or blacklist reducers
  // whitelist: ['user'],
  // blacklist: ['someReducer'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer }, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
