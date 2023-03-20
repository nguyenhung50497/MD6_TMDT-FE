import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";
export const sales = createAsyncThunk(
    "sales/sales",
    async (search) => {
        const res = await customAxios.get(
            "cart-details/stats/sales?" + search
        );
        // const searchParams = new URLSearchParams(search);

        // let keyword = [];
        // let keywordExist = false;
        // for (const [key, value] of searchParams.entries()) {
        //     if (key === "keyword") {
        //         keywordExist = true;
        //         keyword[0] = value;
        //     }
        // }
        // if (keywordExist === false) keyword[0] = null;

        // return { search: res.data, keyword: keyword, existUrl: search[0] };
        return res.data
    }
);