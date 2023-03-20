import { createSlice } from "@reduxjs/toolkit";

import {sales} from "../../service/statsService";


const initialState = {
    sales: [],
    loading: true,
};

const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sales.fulfilled, (state, action) => {
            state.sales = action.payload;
            state.loading = false
        });

    },
});

export default statsSlice.reducer;