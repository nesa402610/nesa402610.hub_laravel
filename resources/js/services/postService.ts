import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const postAPI = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: '/api'}),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => `/blog`,
        }),
        getPostById: builder.query({
            query: (id) => `/blog/${id}`
        })
    }),
})

export const {useGetPostsQuery, useGetPostByIdQuery} = postAPI
