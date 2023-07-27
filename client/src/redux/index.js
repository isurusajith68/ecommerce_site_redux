import { configureStore } from "@reduxjs/toolkit";
import userScliceReducer from "./userSclice";

export const store = configureStore({
  reducer: {
    user: userScliceReducer,
  },
});
