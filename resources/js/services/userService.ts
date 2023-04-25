import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../mockData";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/user",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ``,
      providesTags: ["User"]
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/edit/profile",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["User"]
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: "/edit/account",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["User"]
    }),
    getAllUsers: builder.query({
      query: () => `list`,
      providesTags: ["User"]
    }),
  }),
});

export const {
  useGetUserQuery, useUpdateProfileMutation, useUpdateAccountMutation,
  useGetAllUsersQuery
} = userAPI;
