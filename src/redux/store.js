import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
export const Store = configureStore({
    reducer: {
        users: userReducer
    }
})