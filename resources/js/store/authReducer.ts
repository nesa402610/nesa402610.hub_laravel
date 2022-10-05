import {IActionProps, IUser} from "../types/types";

const defaultState = {
    user: null
} as authState

interface authState {
    user: IUser
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const UPDATE_ACCOUNT = 'UPDATE_ACCOUNT'
const UPDATE_PROFILE = 'UPDATE_PROFILE'
const RATED = 'RATED'

export const authReducer = (state = defaultState, action: IActionProps): authState => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload}
        case LOGOUT:
            localStorage.clear()
            return {...state, user: action.payload}
        case UPDATE_ACCOUNT:
            return {...state, user: action.payload}
        case UPDATE_PROFILE:
            return {...state, user: action.payload}
        case RATED:
            const newState = state.user.rates.map(item => item.project_id === action.payload.id ? {...item, rating: action.payload.rating} : item)
            return {...state, user: {...state.user, rates: newState}}
        default:
            return state
    }
}

export const loginAction = (payload) => ({type: LOGIN, payload})
export const logoutAction = (payload) => ({type: LOGOUT, payload})
export const updateAccountAction = (payload) => ({type: UPDATE_ACCOUNT, payload})
export const updateProfileAction = (payload) => ({type: UPDATE_PROFILE, payload})
export const ratedAction = (payload) => ({type: RATED, payload})
