import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {homePageReducer} from "./reducers/homePageReducer";
import {modalReducer} from "./reducers/modalReducer";
import {BlogReducer} from "./reducers/blogReducer";
import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./reducers/authSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    homePage: homePageReducer,
    modal: modalReducer,
    posts: BlogReducer,
})
export const store = configureStore({reducer: rootReducer, middleware: [thunk]})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
