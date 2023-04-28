import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {IPost} from "../../types/Post";

export const fetchPosts = createAsyncThunk(
    'blog/fetchAll',
    async (_, thunkAPI) => {
        const response = await axios.get<IPost[]>('/blog')
        return response.data;
    }
)
