import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/User";

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
            state.isLoading = false
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
            state.user.rates = state.user.rates.map(item => item.project_id === action.payload.id ?
                item.rating = action.payload.rating
                : item)
        }
    },
    // extraReducers: {
    //     [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
    //         state.isAuth = true
    //         state.isLoading = false
    //         state.user = action.payload
    //     },
    //     [fetchUser.pending.type]: (state) => {
    //         state.isLoading = true
    //     },
    //     [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
    //         state.isLoading = false
    //         state.error = action.payload
    //     }
    // }
})

export default authSlice.reducer
export const {login, logout, updateProfile, updateAccount, rated} = authSlice.actions
