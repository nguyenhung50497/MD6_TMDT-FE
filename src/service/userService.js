import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";
export const loginUser = createAsyncThunk (
    'auth/login',
    async (data) => {
        const res = await customAxios.post('auth/login', data)
        return res.data;
    }
)
export const registerUser = createAsyncThunk(
    'auth/register',
    async (data) => {
        const res = await customAxios.post('auth/register', data)
        return res.data;
    }
)
export const checkEmail = createAsyncThunk (
    'auth/checkEmail',
    async (data) => {
        const res = await customAxios.post('auth/check-email', data)
        return res.data;
    }
)
export const checkPhone = createAsyncThunk (
    'auth/checkPhone',
    async (data) => {
        const res = await customAxios.post('auth/check-phone', data)
        return res.data;
    }
)
export const userGoogle = createAsyncThunk (
    'auth/userGoogle',
    async (data) => {
        const res = await customAxios.post('auth/google', data)
        return res.data
    }
)