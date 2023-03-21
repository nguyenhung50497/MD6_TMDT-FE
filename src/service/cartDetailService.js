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
export const getCartDetailsById = createAsyncThunk(
   "cartDetails/getCartDetailsById",
   async (data) => {
      const res = await customAxios.get("cart-details/find-by-id/" + data);
      return res.data;
   }
);
export const getCartDetailsByUser = createAsyncThunk(
   "cartDetails/getCartDetailsByUser",
   async () => {
      const res = await customAxios.get("cart-details/find-by-user");
      return res.data;
   }
);

export const deleteCartDetails = createAsyncThunk(
   "cartDetails/deleteCartDetails",
   async (data) => {
      const res = await customAxios.delete("cart-details/" + data);
      return res.data;
   }
);