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
export const Store = configureStore({
    reducer: {
        users: userReducer
    }
})