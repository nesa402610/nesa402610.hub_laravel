import modalSlice from "./reducers/modalSlice";
import {userAPI} from "../services/userService";
import {configureStore} from "@reduxjs/toolkit";
import {projectAPI} from "../services/projectService";
import {postAPI} from "../services/postService";
import {taskAPI} from "../services/tasksService";
import {chatAPI} from "../services/chatService";
import {CollectionsAPI} from "../services/Collections/HCollectionService";
import {TagAPI} from "../services/Collections/TagService";
import {AnimeAPI} from "../services/Collections/AnimeService";
import {MangaAPI} from "../services/Collections/MangaService";
import {StudioAPI} from "../services/Collections/StudioService";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [CollectionsAPI.reducerPath]: CollectionsAPI.reducer,
    [TagAPI.reducerPath]: TagAPI.reducer,
    [AnimeAPI.reducerPath]: AnimeAPI.reducer,
    [StudioAPI.reducerPath]: StudioAPI.reducer,
    [MangaAPI.reducerPath]: MangaAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAPI.middleware,
      projectAPI.middleware,
      postAPI.middleware,
      taskAPI.middleware,
      chatAPI.middleware,
      CollectionsAPI.middleware,
      AnimeAPI.middleware,
      StudioAPI.middleware,
      MangaAPI.middleware,
      TagAPI.middleware,
    ])
});

export type RootState = ReturnType<typeof store.getState>




