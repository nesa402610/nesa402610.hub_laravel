import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment, IPost} from "../../types/types";
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
        setPosts(state, action: PayloadAction<IPost[]>) {
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
        addComment(state, action: PayloadAction<IComment>) {
            state.posts.map(post => {
                post.id === action.payload.post_id ?
                    post.comments.push(action.payload) : post.comments
            })
        },
        updateComment(state, action: PayloadAction<IComment>) {
            state.posts.map(post => {
                post.id == action.payload.post_id ?
                    post.comments.map(c => {
                        c.id === action.payload.id ?
                            c.body = action.payload.body
                            : c.body
                    })
                    : post
            })

        }
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
export const {addPost, editPost, setPosts, addComment, deletePost, updateComment} = blogSlice.actions
