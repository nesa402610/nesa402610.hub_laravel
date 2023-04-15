import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";

export const CollectionsAPI = createApi({
  reducerPath: "CollectionsAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/NULL",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["anime", "manga"],
  endpoints: (builder) => ({
    getCollectionTags: builder.query({
      query: () => ({
        url: "/tags",
      }),
      providesTags: ["anime"]
    }),
    getAllAnime: builder.query({
      query: ({passkey, type = "anime", page = 1}) => ({
        url: `?page=${page}`,
        method: "POST",
        body: {passkey, type}
      }),
      providesTags: ['anime']
    }),
    getAllManga: builder.query({
      query: ({passkey, type = "manga", page = 1}) => ({
        url: `?page=${page}`,
        method: "POST",
        body: {passkey, type}
      }),
      providesTags: ["manga"]
    }),
    getCollectionById: builder.query({
      query: ({id, passkey, type = 'anime'}) => ({
        url: `${id}`,
        method: "POST",
        body: {passkey, id, type}
      }),
    }),
    addTagToCollection: builder.mutation({
      query: (data) => ({
        url: "tags/add",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    removeTag: builder.mutation({
      query: (data) => ({
        url: "tags/delete",
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    addTitle: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    updateTitle: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
    deleteTitle: builder.mutation({
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
  useGetCollectionByIdQuery,
  useGetAllAnimeQuery,
  useGetAllMangaQuery,
  useGetCollectionTagsQuery,
  useAddTagToCollectionMutation,
  useRemoveTagMutation,
  useUpdateTitleMutation
} = CollectionsAPI;
