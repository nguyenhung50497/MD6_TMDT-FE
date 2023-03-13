import {createSlice} from "@reduxjs/toolkit";
import {checkEmail, loginUser, userGoogle} from "../../service/userService";

const initialState = {
    users: JSON.parse(localStorage.getItem('users')),
}
const userSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: builder => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.users = action.payload;
            localStorage.setItem('users', JSON.stringify(action.payload))
            localStorage.setItem('token', JSON.stringify(action.payload.token))
        })
        builder.addCase(userGoogle.fulfilled, (state, action) => {
            state.users = action.payload
        })
    }
})
export default userSlice.reducer;