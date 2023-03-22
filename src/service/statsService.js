import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
export const sales = createAsyncThunk("sales/sales", async (search) => {
   const res = await customAxios.get("cart-details/stats/sales?" + search);
   console.log(res.data);
   return res.data;
});
