import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async ()=>{
        const res = await customAxios.get('search/all')
        return res.data;
    }
)
export const search = createAsyncThunk (
    'products/searchProducts',
    async (search) => {
        const res = await customAxios.get('search/products?' + search)
        const searchParams = new URLSearchParams(search);

        let keyword = [];
        let keywordExist = false
        for (const [key, value] of searchParams.entries()) {
            if (key === 'keyword') {
                keywordExist = true
                keyword[0]=value}
        }if (keywordExist === false) keyword[0] = null
        return { search: res.data, keyword: keyword, existUrl: search};
    }
)
export const searchProductById = createAsyncThunk (
    'products/searchProductById',
    async (a) => {
        const response = await customAxios.get(`search?idProduct=`+a);
        return response.data[0];
    }
)