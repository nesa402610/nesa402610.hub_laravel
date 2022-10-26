import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../../types/types";
import {fetchPosts} from "../asyncActions/blogPostActionCreateors";

const initialState: postsState = {
    posts: [],
    isLoading: false,
    error: null
}

interface postsState {
    posts: IPost[]
    isLoading: boolean
    error: any
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<IPost>) {
            // @ts-ignore
            state.posts = action.payload
        },
        addPost(state, action: PayloadAction<IPost>) {
            state.posts.unshift(action.payload)
        },
        editPost(state, action: PayloadAction<IPost>) {
            state.posts = state.posts.map(post => post.id === action.payload.id ?
                action.payload : post
            )
        },
        deletePost(state, action: PayloadAction<IPost>) {
            state.posts = state.posts.filter(post => post.id !== action.payload.id)
        },
    },
    extraReducers: {
        [fetchPosts.fulfilled.type]: (state, action: PayloadAction<IPost[]>) => {
            state.isLoading = false
            state.posts = action.payload
        },
        [fetchPosts.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchPosts.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false
        }
    }

})

export default blogSlice.reducer
export const {addPost, editPost, setPosts, deletePost} = blogSlice.actions
