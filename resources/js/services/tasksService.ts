import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../mockData";
import {ITask} from "../types/Task";

export const taskAPI = createApi({
    reducerPath: 'taskApi',
    tagTypes: ['Task'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/suggestions',
        prepareHeaders: (headers) => {
            headers.set('X-CSRF-TOKEN', csrf_token)
            return headers
        },
    }),
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], void>({
            query: () => '',
            providesTags: ['Task']
        }),
        addTask: builder.mutation({
            query: (suggestion) => ({
                url: 'add',
                method: 'POST',
                body: suggestion
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: builder.mutation({
            query: (suggestion) => ({
                url: 'update',
                method: 'POST',
                body: suggestion
            }),
            invalidatesTags: ['Task']
        }),
        setTaskStatus: builder.mutation({
            query: (status) => ({
                url: 'setStatus',
                method: 'POST',
                body: status
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const {useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useSetTaskStatusMutation} = taskAPI
