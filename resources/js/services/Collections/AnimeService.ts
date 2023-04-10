import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";

export const AnimeAPI = createApi({
  reducerPath: "AnimeAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/anime",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["anime"],
  endpoints: (builder) => ({
    getAllAnime: builder.query({
      query: ({page, passkey}) => ({
        url: "list?page=" + page,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["anime"]
    }),
    getAnimeById: builder.query({
      query: ({id, passkey}) => ({
        url: id,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["anime"]
    }),
    getAllAnimeNP: builder.query({
      query: () => ({
        url: "all",
        method: "GET",
      }),
      providesTags: ["anime"]
    }),
    getAnimeVideos: builder.query({
      query: () => "",
    }),
    addTagToAnime: builder.mutation({
      query: (data) => ({
        url: "tags/add",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    removeTag: builder.mutation({
      query: (data) => ({
        url: "tags/remove",
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    addAnime: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    updateAnime: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    deleteAnime: builder.mutation({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ["anime"]
    }),
  }),
});

export const {
  useGetAllAnimeQuery,
  useGetAllAnimeNPQuery,
  useGetAnimeByIdQuery,
  useAddTagToAnimeMutation,
  useRemoveTagMutation,
  useAddAnimeMutation,
  useUpdateAnimeMutation,
  useDeleteAnimeMutation,
} = AnimeAPI;
