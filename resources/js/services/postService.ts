import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postAPI = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => `/blog`,
            providesTags: ['Post']
        }),
        getPostById: builder.query({
            query: (id) => `/blog/${id}`,
            providesTags: ['Post']
        })
    }),
})

export const {useGetPostsQuery, useGetPostByIdQuery, usePrefetch} = postAPI
