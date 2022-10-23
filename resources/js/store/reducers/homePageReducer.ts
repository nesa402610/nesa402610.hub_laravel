import {IActionProps, ICertProps, IProject} from "../../types/types";

const defaultState = {
    projects: [],
    certificates: []
}

interface homePageProps {
    projects: IProject[]
    certificates: ICertProps[] | null
}

const GET_PROJECTS = 'GET_PROJECTS'
const GET_CERT = 'GET_CERT'
const SET_RATING = 'SET_RATING'
export const homePageReducer = (state = defaultState, action: IActionProps): homePageProps => {
    switch (action.type) {
        case GET_PROJECTS:
            return {...state, projects: action.payload}
        case GET_CERT:
            return {...state, certificates: action.payload}
        case SET_RATING:
            const newState = state.projects.map(obj => obj.id === action.payload.id ? {
                ...obj,
                rate: action.payload.rate
            } : obj)
            return {...state, projects: newState}
        default:
            return state
    }
}

export const getProjectsAction = (payload) => ({type: GET_PROJECTS, payload})
export const setRatingAction = (payload) => ({type: SET_RATING, payload})
