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
