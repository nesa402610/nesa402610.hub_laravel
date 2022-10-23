import {IActionProps, IPost} from "../../types/types";

const defaultState: postsState = {
    posts: []
}

interface postsState {
    posts: IPost[]
}

const SET_POSTS = 'SET_POSTS'
const ADD_POST = 'ADD_POST'

export const BlogReducer = (state = defaultState, action: IActionProps): postsState => {
    switch (action.type) {
        case SET_POSTS:
            return {...state, posts: action.payload}
        case ADD_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        default:
            return state
    }
}

export const setPostsActions = (payload) => ({type: SET_POSTS, payload})
export const addPostActions = (payload) => ({type: ADD_POST, payload})
