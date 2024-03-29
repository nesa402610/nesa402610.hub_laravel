import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../mockData";
import {IUser} from "../types/User";

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/user",
        prepareHeaders: (headers) => {
            headers.set("X-CSRF-TOKEN", csrf_token);
            return headers;
        },
    }),
    tagTypes: ["User", 'UserAnimeList'],
    endpoints: (builder) => ({
        getUser: builder.query<IUser, void | string>({
            query: (id) => `${id ? id : ''}`,
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
        getAllUsers: builder.query<IUser[], void>({
            query: () => `list`,
            providesTags: ["User"]
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["User"]
        }),
    }),
});

export const {
    useGetUserQuery,
    useUpdateProfileMutation,
    useUpdateAccountMutation,
    useGetAllUsersQuery,
} = userAPI;
