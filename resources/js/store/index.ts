import blogSlice from "./reducers/blogSlice";
import HomePageSlice from "./reducers/homePageSlice";
import modalSlice from "./reducers/modalSlice";
import suggestionSlice from "./reducers/suggestionSlice";
import {userAPI} from "../services/userService";
import {configureStore} from "@reduxjs/toolkit";
import {projectAPI} from "../services/projectService";
import {postAPI} from "../services/postService";
import {taskAPI} from "../services/tasksService";
import {chatAPI} from "../services/chatService";

export const store = configureStore({
    reducer: {
        homePage: HomePageSlice,
        modal: modalSlice,
        posts: blogSlice,
        tasks: suggestionSlice,
        [userAPI.reducerPath]: userAPI.reducer,
        [projectAPI.reducerPath]: projectAPI.reducer,
        [postAPI.reducerPath]: postAPI.reducer,
        [taskAPI.reducerPath]: taskAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userAPI.middleware,
            projectAPI.middleware,
            postAPI.middleware,
            taskAPI.middleware,
            chatAPI.middleware,
        ])
})

export type RootState = ReturnType<typeof store.getState>




