import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {csrf_token} from "../../mockData";

export interface IOverview {
    anime: {
        genresCount: number;
        tagsCount: number
        total: number
        rx: number
        ff: number
        studiosCount: number
    }
    messagesCount: number
    usersCount: number
    works: {
        completed: number
        planned: number
        dropped: number
        total: number
    }
}

export const dashboardAPI = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/dashboard',
        prepareHeaders: (headers) => {
            headers.set('X-CSRF-TOKEN', csrf_token)
            return headers
        },
    }),
    tagTypes: ['overview', 'CommentList', 'PostList'],
    endpoints: (builder) => ({
        getOverview: builder.query<IOverview, void>({
            query: () => ``,
            providesTags: ['overview']
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: 'create',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['PostList']
        }),
    }),
})

export const {
    useGetOverviewQuery
} = dashboardAPI
