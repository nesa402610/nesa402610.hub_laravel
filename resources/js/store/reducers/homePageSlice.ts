import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICert, IProject} from "../../types/types";

const initialState: homePageProps = {
    projects: [],
    certificates: []
}

interface homePageProps {
    projects: IProject[]
    certificates: ICert[] | null
}

const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<IProject>) {
            // @ts-ignore
            state.projects = (action.payload)
        },
        setCertificates(state, action: PayloadAction<ICert>) {
        },
        setRating(state, action) {
            state.projects.map(p => p.id === action.payload.id ? p.rate = action.payload.rate : p)
        },

    }
})
export default homePageSlice.reducer
export const {setProjects, setCertificates, setRating} = homePageSlice.actions
