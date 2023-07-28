import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: [],
}

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = [...action.payload];

    },
  },
});

export const { addProduct } = productSlice.actions;
//  export const selectProduct = (state) => state.product;
 export default productSlice.reducer;
