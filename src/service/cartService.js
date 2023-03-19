import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllCartShop = createAsyncThunk(
    "carts/getAllCartShop",
    async (data) => {
        const res = await customAxios.get("carts/" + data);
        return res.data;
    }
);
export const getCartByStatus = createAsyncThunk(
    "carts/getCartByStatus",
    async (data) => {
        const res = await customAxios.post("carts/" + data.id, data);
        return res.data;
    }
)
export const searchByName = createAsyncThunk (
    "carts/searchByName",
    async (data) => {
        const res = await customAxios.post("carts/search-by-name/" + data.idShop, data);
        return res.data;
    }
)
export const searchByPhone = createAsyncThunk (
    "carts/searchByPhone",
    async (data) => {
        const res = await customAxios.post("carts/search-by-phone/" + data.idShop, data);
        return res.data;
    }
)
export const searchByIdCart = createAsyncThunk (
    "carts/searchByIdCart",
    async (data) => {
        const res = await customAxios.post("carts/search-by-idCart/" + data.idShop, data);
        return res.data;
    }
)
export const getDetailCart = createAsyncThunk (
    "carts/getDetailCart",
    async (data) => {
        const res = await customAxios.get("carts/detail-cart/" + data);
        return res.data;
    }
)
export const orderStatusSending = createAsyncThunk (
    "carts/getDetailCart",
    async (data) => {
        const res = await customAxios.get("carts/order-status-sending/" + data);
        return res.data;
    }
)
export const orderStatusRefunds = createAsyncThunk (
    "carts/orderStatusRefunds",
    async (data) => {
        const res = await customAxios.get("carts/order-status-refunds/" + data);
        return res.data;
    }
)
