import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../mockData";
import {IProject} from "../types/Project";

export const projectAPI = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/projects`,
      providesTags: ["Project"]
    }),
    createProject: builder.mutation({
      query: (project: IProject) => ({
        url: "/admin/createProject",
        method: "POST",
        body: project
      }),
      invalidatesTags: ["Project"]
    }),
    updateProject: builder.mutation({
      query: (arg: { project: IProject, id: number }) => ({
        url: "/admin/updateProject/" + arg.id,
        method: "PATCH",
        body: arg.project
      }),
      invalidatesTags: ["Project"]
    })
  }),
});

export const {useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation} = projectAPI;
