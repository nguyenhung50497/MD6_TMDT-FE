import { createSlice } from "@reduxjs/toolkit";
import {searchCartDetail} from "../../service/cartDetailService";


const initialState = {
    searchCartDetail: [],
    loading: true,
};

const cartDetailSlice = createSlice({
    name: "cartDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(searchCartDetail.fulfilled, (state, action) => {
            state.searchCartDetail = action.payload.cartDetails;
            state.loading = false
        });

    },
});

export default cartDetailSlice.reducer;
