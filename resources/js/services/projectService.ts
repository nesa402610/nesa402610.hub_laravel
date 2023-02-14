import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IProject} from "../types/types";

const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export const projectAPI = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api',
        prepareHeaders: (headers) => {
            headers.set('X-CSRF-TOKEN', csrf_token)
            return headers
        },
    }),
    tagTypes: ['Project'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => `/projects`,
            providesTags: ['Project']
        }),
        createProject: builder.mutation({
            query: (project: IProject) => ({
                url: '/admin/createProject',
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['Project']
        })
    }),
})

export const {useGetProjectsQuery, useCreateProjectMutation} = projectAPI
