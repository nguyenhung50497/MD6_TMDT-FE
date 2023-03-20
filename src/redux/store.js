import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import addressReducer from "./slices/addressSlice";
import {configureStore} from "@reduxjs/toolkit";
import shopReducer from "./shops/shopSlice";
import transportReducer from "./transport/transportSlice";
import userReducer from "./users/userSlice";
import addressUserReducer from './address/addressSlice'
import cartDetailReducer from './slices/cartDetailSlice'
import statsReducer from './slices/statsSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
        users: userReducer,
        shops: shopReducer,
        transports: transportReducer,
        address: addressReducer,
        addresses: addressUserReducer,
        cartDetail: cartDetailReducer,
        stats: statsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
