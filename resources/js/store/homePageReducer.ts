import {IActionProps, ICertProps, ISite} from "../types/types";

const defaultState = {
    projects: [],
    certificates: []
}

interface homePageProps {
    projects: ISite[]
    certificates: ICertProps[] | null
}

const GET_PROJECTS = 'GET_PROJECTS'
const GET_CERT = 'GET_CERT'
export const homePageReducer = (state = defaultState, action: IActionProps): homePageProps => {
    switch (action.type) {
        case GET_PROJECTS:
            return {...state, projects: action.payload}
        case GET_CERT:
            return {...state, certificates: action.payload}
        default:
            return state
    }
}

export const getProjectsAction = (payload) => ({type: GET_PROJECTS, payload})
