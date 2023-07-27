import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  fristName: "",
  lastName: "",
  email: "",
  image: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload._id;
      state.fristName = action.payload.fristName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    logOut: (state, action) => {
      state._id = "";
      state.fristName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";
    },
  },
});

export const { loginRedux ,logOut } = userSlice.actions;
export default userSlice.reducer;
