import modalSlice from "./reducers/modalSlice";
import {userAPI} from "../services/userService";
import {configureStore} from "@reduxjs/toolkit";
import {projectAPI} from "../services/projectService";
import {postAPI} from "../services/postService";
import {taskAPI} from "../services/tasksService";
import {chatAPI} from "../services/chatService";
import {hcollectionAPI} from "../services/HCollectionService";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [taskAPI.reducerPath]: taskAPI.reducer,
    [chatAPI.reducerPath]: chatAPI.reducer,
    [hcollectionAPI.reducerPath]: hcollectionAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAPI.middleware,
      projectAPI.middleware,
      postAPI.middleware,
      taskAPI.middleware,
      chatAPI.middleware,
      hcollectionAPI.middleware,
    ])
})

export type RootState = ReturnType<typeof store.getState>




