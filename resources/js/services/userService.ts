import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const userAPI = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: 'api'}),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/checkLogin`,
        }),
    }),
})

export const {useGetUserQuery} = userAPI
