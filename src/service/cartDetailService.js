import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getCartDetails = createAsyncThunk(
   "cartDetails/getCartDetails",
   async () => {
      const res = await customAxios.get("cart-details");
      return res.data;
   }
);
export const addCartDetails = createAsyncThunk(
   "cartDetails/addCartDetails",
   async (data) => {
      const res = await customAxios.post("cart-details", data);
      return res.data;
   }
);