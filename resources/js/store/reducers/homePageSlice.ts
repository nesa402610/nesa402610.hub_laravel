import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchProjects} from "../asyncActions/projectActionCreators";
import {ICert, IProject} from "../../types/Project";

const initialState: homePageProps = {
    projects: [],
    certificates: [],
    isLoading: false,
    error: null
}

interface homePageProps {
    projects: IProject[]
    certificates: ICert[] | null
    isLoading: boolean
    error: string
}

const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setCertificates(state, action: PayloadAction<ICert>) {
        },
        setRating(state, action) {
            state.projects.map(p => p.id === action.payload.id ? p.rate = action.payload.rate : p)
        },
    },
    extraReducers: {
        [fetchProjects.fulfilled.type]: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload
            state.isLoading = false
        },
        [fetchProjects.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchProjects.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default homePageSlice.reducer
export const {setCertificates, setRating} = homePageSlice.actions
