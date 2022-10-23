import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {authReducer} from "./reducers/authReducer";
import {homePageReducer} from "./reducers/homePageReducer";
import {modalReducer} from "./reducers/modalReducer";
import {BlogReducer} from "./reducers/blogReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    homePage: homePageReducer,
    modal: modalReducer,
    posts: BlogReducer,
})
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof rootReducer>
