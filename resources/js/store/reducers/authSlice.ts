import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/types";

const initialState: authState = {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null
}
interface authState {
    user: IUser
    isAuth: boolean
    isLoading: boolean
    error: any
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.isAuth = true
            state.user = action.payload
        },
        logout(state) {
            state.isAuth = false
            state.user = null
        },
        updateAccount(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        updateProfile(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
        rated(state, action) {
            console.log(1)
        }
    }
})

export default authSlice.reducer
export const {login, logout, updateProfile, updateAccount, rated} = authSlice.actions
