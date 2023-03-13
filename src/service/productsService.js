import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async ()=>{
        const res = await customAxios.get('')
        return res.data;
    }
)
export const search = createAsyncThunk (
    'products/searchProducts',
    async (search) => {
        return await customAxios.get('search?' + search);
    }
)
export const searchProductById = createAsyncThunk (
    'products/searchProductById',
    async (a) => {
        const response = await customAxios.get(`search?idProduct=`+a);
        return response.data[0];
    }
)