import {createAsyncThunk} from "@reduxjs/toolkit";
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
        const res = await customAxios.get('search?' + search)
        console.log(search)
        const searchParams = new URLSearchParams(search);
// Display the key/value pairs
        let keyword = [];
        for (const [key, value] of searchParams.entries()) {
            if (key === 'keyword') keyword[0]=value
            else keyword[0]=null
            // console.log(`${key}, ${value}`);
        }
        // return res.data
        return { search: res.data, keyword: keyword};
    }
)
export const searchProductById = createAsyncThunk (
    'products/searchProductById',
    async (a) => {
        const response = await customAxios.get(`search?idProduct=`+a);
        return response.data[0];
    }
)