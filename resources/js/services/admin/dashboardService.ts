import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {csrf_token} from "../../mockData";

interface IOverview {
    animeCount: number
    animeStudiosCount: number
    mangaCount: number
    tagsCount: number
    messagesCount: number
    usersCount: number
    projectsCount: number
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
