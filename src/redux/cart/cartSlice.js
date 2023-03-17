import {createSlice} from "@reduxjs/toolkit";
import {getAllCartShop} from "../../service/cartService";

const initialState = {
    carts: {}
}
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCartShop.fulfilled, (state, action) => {
            state.carts = action.payload
        })
    }
})
export default cartSlice.reducer;