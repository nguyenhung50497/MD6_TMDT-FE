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