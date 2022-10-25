import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import blogSlice from "./reducers/blogSlice";
import HomePageSlice from "./reducers/homePageSlice";
import modalSlice from "./reducers/modalSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    homePage: HomePageSlice,
    modal: modalSlice,
    posts: blogSlice,
})
export const store = configureStore({reducer: rootReducer, middleware: [thunk]})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
