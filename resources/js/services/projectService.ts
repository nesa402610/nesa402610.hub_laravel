import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const projectAPI = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: 'api'}),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `/projects`,
        }),
    }),
})

export const {useGetProjectsQuery} = projectAPI
