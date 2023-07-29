import { createSlice } from "@reduxjs/toolkit";
import { Toaster, toast } from "react-hot-toast";

const initialState = {
  product: [],
  cart: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.product = [...action.payload];
    },
    addCart: (state, action) => {
      const index = state.cart.findIndex((el) => el._id === action.payload._id);
      // console.log(index);
      if (index !== -1) {
        // state.cart[index].qty++;
        // state.cart[index].total =
        //   state.cart[index].price * state.cart[index].qty;
        // return;
        toast.error("Product Already Added");
      } else {
        const total = action.payload.price;
        state.cart = [...state.cart, { ...action.payload, qty: 1, total }];
      }
    },
    deleteCart: (state, action) => {
      const index = state.cart.findIndex((el) => el._id === action.payload);
      state.cart.splice(index, 1);
    },
    increment: (state, action) => {
      const index = state.cart.findIndex((el) => el._id === action.payload);
      state.cart[index].qty++;
      state.cart[index].total = state.cart[index].price * state.cart[index].qty;
    },
    decrement: (state, action) => {
      const index = state.cart.findIndex((el) => el._id === action.payload);
      state.cart[index].qty--;
      state.cart[index].total = state.cart[index].price * state.cart[index].qty;
    },
 
  },
});

export const { addProduct } = productSlice.actions;
export const { addCart } = productSlice.actions;
export const { deleteCart } = productSlice.actions;
export const { increment } = productSlice.actions;
export const { decrement } = productSlice.actions;
export default productSlice.reducer;
