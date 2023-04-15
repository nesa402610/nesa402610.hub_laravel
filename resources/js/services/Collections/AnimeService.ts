import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnime} from "../../types/Anime";

interface getArgs {
  page?: number;
  id?: string;
  passkey?: string;
}

interface withPaginate {
  data: IAnime[];
  current_page: number;
  last_page: number;
}

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
    getAllAnime: builder.query<withPaginate, getArgs>({
      query: ({page, passkey}) => ({
        url: "list?page=" + page,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["anime"]
    }),
    getAnimeById: builder.query<IAnime, getArgs>({
      query: ({id, passkey}) => ({
        url: id,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["anime"]
    }),
    getAllAnimeNP: builder.query<IAnime[], unknown>({
      query: () => ({
        url: "all",
        method: "GET",
      }),
      providesTags: ["anime"]
    }),
    getAnimeVideos: builder.query({
      query: (id) => id + "/videos",
    }),
    deleteAnimeVideo: builder.mutation({
      query: (id) => ({
        url: "videos/delete/"+id,
        method: "delete",
      }),
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
  useGetAnimeVideosQuery,
  useAddTagToAnimeMutation,
  useRemoveTagMutation,
  useAddAnimeMutation,
  useUpdateAnimeMutation,
  useDeleteAnimeMutation,
  useDeleteAnimeVideoMutation
} = AnimeAPI;
