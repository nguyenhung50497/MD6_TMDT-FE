import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
export const sales = createAsyncThunk(
    "sales/sales",
    async (search) => {
        const res = await customAxios.get(
            "cart-details/stats/sales?" + search
        );
        // let totalProduct = [] //Tổng tiền của các sản phẩm đã bán
        // for (let i = 0; i < res.data.length; i++) {
        //     totalProduct[i] = {
        //         priceInCart : res.data[i].priceInCart,
        //         quantityCart : res.data[i].quantityCart,
        //         nameProduct:  res.data[i].nameProduct,
        //         total: res.data[i].priceInCart * res.data[i].quantityCart
        //     }
        // }
        return res.data
    }
);