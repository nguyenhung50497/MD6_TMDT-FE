import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api"
export const createShop = createAsyncThunk (
    'shops/createShop',
    async (data) => {
        const res = await customAxios.post('shops', data)
        return res.data;
    }
)
export const findByIdUserShop = createAsyncThunk (
    'shops/findByIdUserShop',
    async (data) => {
        const res = await customAxios.get('shops/'+data)
        return res.data;
    }
)