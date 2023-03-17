import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllCartShop = createAsyncThunk(
    "carts/getAllCartShop",
    async (data) => {
        const res = await customAxios.get("carts/"+data);
        return res.data;
    }
);
