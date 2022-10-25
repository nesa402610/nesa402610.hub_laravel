import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IPost} from "../../types/types";

const initialState: postsState = {
    posts: null,
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


    }

})

export default blogSlice.reducer
export const {addPost, editPost, setPosts, deletePost} = blogSlice.actions
