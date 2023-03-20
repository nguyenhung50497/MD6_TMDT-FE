import { createSlice } from "@reduxjs/toolkit";
import { addCartDetails, getCartDetails } from "../../service/cartDetailService";

const initialState = {
   cartDetails: [],
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
   },
});

export default cartDetailSlice.reducer;
