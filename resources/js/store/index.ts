import {combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {homePageReducer} from "./homePageReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    homePage: homePageReducer
})
export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>
