import {createSlice} from "@reduxjs/toolkit";
import {getProducts, search, searchProductById} from "../../service/productsService";


const initialState = {
    products: [],
    search: [],
    keyword: [],
    existUrl: '',
    currentProduct: {},
    loading: true
}
const productsSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            });
            builder.addCase(search.fulfilled, (state, action) => {
                state.search = action.payload.search;
                state.keyword = action.payload.keyword;
                state.existUrl = action.payload.existUrl;
                state.loading = false
            });
            builder.addCase(searchProductById.fulfilled, (state, action) => {
                state.currentProduct = action.payload;
                state.loading = false
            });
        }
    }
)
export default productsSlice.reducer;