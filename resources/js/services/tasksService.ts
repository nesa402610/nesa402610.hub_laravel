import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const taskAPI = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({baseUrl: 'api'}),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: () => '/suggestions'
        })
    })
})

export const {useGetTasksQuery} = taskAPI
