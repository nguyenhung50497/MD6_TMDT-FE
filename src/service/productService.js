import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk(
   "products/getProducts",
   async (page) => {
      const res = await customAxios.get("products?page=" + page);
      return res.data;
   }
);

export const getProductById = createAsyncThunk(
   "products/getProduct",
   async (data) => {
      const res = await customAxios.get("products/find-by-id/" + data);
      return res.data;
   }
);

export const addProduct = createAsyncThunk(
   "products/addProduct",
   async (data) => {
      const res = await customAxios.post("products", data);
      return res.data;
   }
);

export const editProduct = createAsyncThunk(
   "products/editProduct",
   async (data) => {
      const res = await customAxios.put("products/" + data.idProduct, data);
      return res.data;
   }
);

export const deleteProduct = createAsyncThunk(
   "products/deleteProduct",
   async (data) => {
      const res = await customAxios.delete("products/" + data);
      return res.data;
   }
);
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
