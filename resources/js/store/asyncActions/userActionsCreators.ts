import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
    'user/fetchAuth',
    async (_, thunkAPI) => {
        const response = await axios.post('/checkLogin')
        return response.data;
    }
)
