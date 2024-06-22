import modalSlice from "./reducers/modalSlice";
import {userAPI} from "services/userService";
import {configureStore} from "@reduxjs/toolkit";
import {projectAPI} from "services/projectService";
import {NewsAPI} from "services/NewsService";
import {taskAPI} from "services/tasksService";
import {chatAPI} from "services/chatService";
import {CollectionsAPI} from "services/Anime/HCollectionService";
import {TagAPI} from "services/Anime/TagService";
import {AnimeAPI} from "services/Anime/AnimeService";
import {StudioAPI} from "services/Anime/StudioService";
import collectionSlice from "./reducers/collectionSlice";
import appSlice from "./reducers/appSlice";
import {dashboardAPI} from "services/admin/dashboardService";
import {kinopoiskAPI} from "services/Kinopoisk";
import notificationSlice from "store/reducers/notificationSlice";

export const store = configureStore({
    reducer: {
        app: appSlice,
        modal: modalSlice,
        collection: collectionSlice,
        notification: notificationSlice,
        [userAPI.reducerPath]: userAPI.reducer,
        [projectAPI.reducerPath]: projectAPI.reducer,
        [NewsAPI.reducerPath]: NewsAPI.reducer,
        [taskAPI.reducerPath]: taskAPI.reducer,
        [chatAPI.reducerPath]: chatAPI.reducer,
        [CollectionsAPI.reducerPath]: CollectionsAPI.reducer,
        [TagAPI.reducerPath]: TagAPI.reducer,
        [AnimeAPI.reducerPath]: AnimeAPI.reducer,
        [StudioAPI.reducerPath]: StudioAPI.reducer,
        [dashboardAPI.reducerPath]: dashboardAPI.reducer,
        [kinopoiskAPI.reducerPath]: kinopoiskAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            userAPI.middleware,
            projectAPI.middleware,
            NewsAPI.middleware,
            taskAPI.middleware,
            chatAPI.middleware,
            CollectionsAPI.middleware,
            AnimeAPI.middleware,
            StudioAPI.middleware,
            TagAPI.middleware,
            dashboardAPI.middleware,
            kinopoiskAPI.middleware,
        ])
});

export type RootState = ReturnType<typeof store.getState>




