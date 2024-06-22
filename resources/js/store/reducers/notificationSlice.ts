import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface NotificationState {
    type?: 'error' | 'system' | 'success' | 'alert'
    message: string | null;
}

const initialState: NotificationState = {
    message: null,
    type: 'system'
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action: PayloadAction<NotificationState | string>) => {
            if (typeof action.payload !== "string") {
                state.type = action.payload.type
                state.message = action.payload.message
            } else {
                state.message = action.payload;
            }

        },
        clearNotification: (state) => {
            state.message = null;
            state.type = 'system'
        },
    },
});

export const {setNotification, clearNotification} = notificationSlice.actions;

export default notificationSlice.reducer;
