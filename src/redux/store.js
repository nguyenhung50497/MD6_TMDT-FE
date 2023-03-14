import productReducer from "./slices/productSlice";
import categoryReducer from "./slices/categorySlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
   reducer: {
      products: productReducer,
      categories: categoryReducer,
   },
});

export default store;

import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import shopReducer from "./shops/shopSlice"
import transportReducer from "./transport/transportSlice";
export const Store = configureStore({
    reducer: {
        users: userReducer,
        shops: shopReducer,
        transports: transportReducer
    }
})