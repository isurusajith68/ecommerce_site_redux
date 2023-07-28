import { configureStore } from "@reduxjs/toolkit";
import userScliceReducer from "./userSclice";
import productSliceReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: userScliceReducer,
    product: productSliceReducer,
  },
});
