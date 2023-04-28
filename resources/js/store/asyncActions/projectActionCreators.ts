import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IProject} from "../../types/Project";

export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, thunkAPI) => {
        const response = await axios.get<IProject[]>('/projects')
        return response.data
    }
)
