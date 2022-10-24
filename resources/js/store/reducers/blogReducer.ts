import {IActionProps, IPost} from "../../types/types";

const defaultState: postsState = {
    posts: []
}

interface postsState {
    posts: IPost[]
}

const SET_POSTS = 'SET_POSTS'
const ADD_POST = 'ADD_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'

export const BlogReducer = (state = defaultState, action: IActionProps): postsState => {
    switch (action.type) {
        case SET_POSTS:
            return {...state, posts: action.payload}
        case ADD_POST:
            return {...state, posts: [action.payload, ...state.posts]}
        case EDIT_POST:
            return {
                ...state, posts: state.posts.map(post => post.id === action.payload.id
                    ?
                    action.payload
                    : post)
            }
        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.payload)}
        default:
            return state
    }
}

export const setPostsActions = (payload) => ({type: SET_POSTS, payload})
export const addPostActions = (payload) => ({type: ADD_POST, payload})
export const editPostActions = (payload) => ({type: EDIT_POST, payload})
export const deletePostActions = (payload) => ({type: DELETE_POST, payload})
