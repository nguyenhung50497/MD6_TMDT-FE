import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getNotifications = createAsyncThunk(
    "notifications/getNotifications",
    async () => {
        const res = await customAxios.get("notification");
        return res.data;
    }
);

export const getNotificationsByUser = createAsyncThunk(
    "notifications/getNotificationsByUser",
    async (idUser) => {
        const res = await customAxios.get("notification/find-by-user/" + idUser);
        return res.data;
    }
);


export const getNotificationsByShop = createAsyncThunk(
    "notifications/getNotificationsByShop",
    async (idShop) => {
        const res = await customAxios.get("notification/find-by-shop/" + idShop);
        return res.data;
    }
);

export const addNotification = createAsyncThunk(
    "notifications/addNotifications",
    async (data) => {
        const res = await customAxios.post("notification", data);
        return res.data;
    }
);

export const editNotification = createAsyncThunk(
    "notifications/editNotifications",
    async (data) => {
        const res = await customAxios.put("notifications/" + data.idNotification, data);
        return res.data;
    }
);

export const deleteNotification = createAsyncThunk(
    "notifications/deleteNotifications",
    async (data) => {
        const res = await customAxios.delete("notifications/" + data);
        return res.data;
    }
);
