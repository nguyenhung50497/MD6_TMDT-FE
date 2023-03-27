import {createSlice} from "@reduxjs/toolkit";
import {getNotificationsByReceiver} from "../../service/notificationService";

const initialState = {
    notifications: []
}
const notificationSlice = createSlice({
    name: 'shops',
    initialState,
    extraReducers: builder => {
        builder.addCase(getNotificationsByReceiver.fulfilled, (state, action) => {
            state.notifications = action.payload
        })
    }
})
export default notificationSlice.reducer;