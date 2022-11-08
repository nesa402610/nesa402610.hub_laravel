import {combineReducers} from "redux";
import thunkMiddleware from 'redux-thunk';
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";
import blogSlice from "./reducers/blogSlice";
import HomePageSlice from "./reducers/homePageSlice";
import modalSlice from "./reducers/modalSlice";
import suggestionSlice from "./reducers/suggestionSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    homePage: HomePageSlice,
    modal: modalSlice,
    posts: blogSlice,
    tasks: suggestionSlice
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware],
})

export type RootState = ReturnType<typeof rootReducer>

