import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./authReducer";
import {homePageReducer} from "./homePageReducer";
import {modalReducer} from "./modalReducer";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
    homePage: homePageReducer,
    modal: modalReducer
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>
