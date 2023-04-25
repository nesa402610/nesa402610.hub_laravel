import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnime, IAnimeVideos} from "../../types/Anime";

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
  tagTypes: ["anime", "videos", "animeList"],
  endpoints: (builder) => ({
    getAllAnime: builder.query<withPaginate, getArgs>({
      query: ({page, passkey}) => ({
        url: "list?page=" + page,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["animeList"]
    }),
    getAnimeById: builder.query<IAnime, getArgs>({
      query: ({id, passkey}) => ({
        url: id,
        method: "POST",
        body: {passkey}
      }),
      providesTags: ["anime"]
    }),
    getAllAnimeNP: builder.query<IAnime[], void>({
      query: () => ({
        url: "all",
        method: "GET",
      }),
      providesTags: ["animeList"]
    }),
    getAnimeVideos: builder.query({
      query: (id) => id + "/videos",
      providesTags: ["videos"]
    }),
    deleteAnimeVideo: builder.mutation({
      query: (id) => ({
        url: "videos/delete/" + id,
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
    addAnime: builder.mutation<IAnime, IAnime>({
      query: (data) => ({
        url: "new",
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["animeList"]
    }),
    updateAnime: builder.mutation<IAnime, { anime: IAnime, videos: IAnimeVideos[] }>({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["animeList"]
    }),
    deleteAnime: builder.mutation({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ["animeList"]
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
