import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: appProps = {
    headerType: 0
}

interface appProps {
    headerType: number
}

const appSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setHeaderType(state, action: PayloadAction<number>) {
            state.headerType = action.payload
        },
    },
})
export default appSlice.reducer
export const {setHeaderType} = appSlice.actions
