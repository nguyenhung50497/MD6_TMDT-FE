import {configureStore} from "@reduxjs/toolkit";
import productReducer from './products/productsSlice'


export const store = configureStore({
    reducer: {
        products: productReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})