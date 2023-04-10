import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";

export const MangaAPI = createApi({
  reducerPath: "MangaAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/manga",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["manga"],
  endpoints: (builder) => ({
    getAllManga: builder.query({
      query: ({page, passkey}) => ({
        url: "list?page="+page,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["manga"]
    }),
    getMangaById: builder.query({
      query: ({id, passkey}) => ({
        url: id,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["manga"]
    }),
    addTagToManga: builder.mutation({
      query: (data) => ({
        url: "tags/add",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["manga"]
    }),
    removeTag: builder.mutation({
      query: (data) => ({
        url: "tags/delete",
        method: "DELETE",
        body: data
      }),
      invalidatesTags: ["manga"]
    }),
    createManga: builder.mutation({
      query: (data) => ({
        url: "create",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["manga"]
    }),
    updateManga: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["manga"]
    }),
    deleteManga: builder.mutation({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ["manga"]
    }),
  }),
});

export const {
  useGetAllMangaQuery,
  useGetMangaByIdQuery,
  useAddTagToMangaMutation,
  useRemoveTagMutation,
  useUpdateMangaMutation,
  useCreateMangaMutation,
  useDeleteMangaMutation
} = MangaAPI;
