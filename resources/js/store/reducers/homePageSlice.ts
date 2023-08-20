import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICert, IProject} from "types/Project";

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
})
export default homePageSlice.reducer
export const {setCertificates, setRating} = homePageSlice.actions
