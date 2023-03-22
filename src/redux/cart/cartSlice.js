import {createSlice} from "@reduxjs/toolkit";
import {
    getAllCartShop,
    getCartByIdUser,
    getCartByStatus,
    getDetailCart, searchByCategory,
    searchByIdCart,
    searchByName,
    searchByPhone
} from "../../service/cartService";

const initialState = {
    carts: [],
    detailCart: [],
    cart: {}
}
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    extraReducers: builder => {
        builder.addCase(getAllCartShop.fulfilled, (state, action) => {
            state.carts = action.payload
        })
        builder.addCase(getCartByStatus.fulfilled, (state, action) => {
            state.carts = action.payload
        })
        builder.addCase(searchByName.fulfilled,(state, action) => {
            state.carts = action.payload
        })
        builder.addCase(searchByCategory.fulfilled,(state, action) => {
            state.carts = action.payload
        })
        builder.addCase(searchByIdCart.fulfilled,(state, action) => {
            state.carts = action.payload
        })
        builder.addCase(searchByPhone.fulfilled,(state, action) => {
            state.carts = action.payload
        })
        builder.addCase(getDetailCart.fulfilled,(state, action) => {
            state.detailCart = action.payload
        })
        builder.addCase(getCartByIdUser.fulfilled, (state, action) => {
           state.cart = action.payload;
        });
    }
})
export default cartSlice.reducer;