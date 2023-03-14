import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getProducts = createAsyncThunk("products/getProducts", async (page) => {
  const res = await customAxios.get("products?page=" + page);
  return res.data;
});

export const getProductById = createAsyncThunk("products/getProduct", async (data) => {
  const res = await customAxios.get("products/find-by-id/" + data);
  return res.data;
});

export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
  const res = await customAxios.post("products", data);
  return res.data;
});

export const editProduct = createAsyncThunk(
    "products/editProduct",
    async (data) => {
  const res = await customAxios.put("products/" + data.idProduct, data);
  return res.data;
});

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (data) => {
    const res = await customAxios.delete("products/" + data);
    return res.data;
});