import { createSlice } from "@reduxjs/toolkit";
import { addCartDetails, getCartDetails, getCartDetailsById, getCartDetailsByUser } from "../../service/cartDetailService";
import { payCart } from "../../service/cartService";

const initialState = {
   cartDetails: [],
   cartDetail: [],
};

const cartDetailSlice = createSlice({
   name: "cartDetail",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(getCartDetails.fulfilled, (state, action) => {
         state.cartDetails = action.payload;
      });
      builder.addCase(addCartDetails.fulfilled, (state, action) => {
         state.cartDetails.push(action.payload);
      });
      builder.addCase(getCartDetailsById.fulfilled, (state, action) => {
         state.cartDetail = action.payload;
      });
      builder.addCase(getCartDetailsByUser.fulfilled, (state, action) => {
         state.cartDetails = action.payload;
      });
      builder.addCase(payCart.fulfilled, (state, action) => {
         state.cartDetails = action.payload;
      });
   },
});

export default cartDetailSlice.reducer;
