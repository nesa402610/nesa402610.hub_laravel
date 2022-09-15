const defaultState = {
    user: {}
}

interface authState {
    user: object
}
interface authAction {
    type: string
    payload?: any
}

const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

export const authReducer = (state = defaultState, action: authAction): authState => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload}
        case LOGOUT:
            localStorage.clear()
            return {...state, user: {}}
        default:
            return state
    }
}

export const loginAction = (payload) => ({type: LOGIN, payload})
