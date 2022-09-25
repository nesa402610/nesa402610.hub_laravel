import {combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {homePageReducer} from "./homePageReducer";
import {modalReducer} from "./modalReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    homePage: homePageReducer,
    modal: modalReducer
})
export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
