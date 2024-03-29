import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnimeVideos} from "../../types/Anime";
import {ICollection} from "../../types/types";

interface getArgs {
    page?: number;
    id?: string;
    passkey?: string;
    query?: any
}

interface withPaginate {
    data: ICollection[];
    current_page: number;
    last_page: number;
}

interface AnimeListOverviewProps {
    count: number
    watched: number
    rewatching: number
    unwatched: number
    dropped: number
    planned: number
    watching: number
    out: number
    fuckout: number
    status: number
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
    tagTypes: ["anime", "videos", "animeList", 'UserAnimeList'],
    endpoints: (builder) => ({
        getAllAnime: builder.query<withPaginate, getArgs>({
            query: ({page = 1, passkey, query = null}) => ({
                url: "list?page=" + page,
                method: "POST",
                body: {passkey, ...query}
            }),
            providesTags: (_) => ["animeList"]
        }),
        // getAllAnimeQ: builder.mutation<withPaginate, getArgs>({
        //     query: ({page = 1, passkey, query}) => ({
        //         url: "list?page=" + page,
        //         method: "POST",
        //         body: {passkey, ...query}
        //     }),
        //     invalidatesTags: ["animeList"]
        // }),
        getAnimeById: builder.query<ICollection, getArgs>({
            query: ({id, passkey}) => ({
                url: id,
                method: "POST",
                body: {passkey}
            }),
            providesTags: ["anime"]
        }),
        getAllAnimeNP: builder.query<ICollection[], void>({
            query: () => ({
                url: "all",
                method: "GET",
            }),
            providesTags: ["animeList"]
        }),
        getAnimeVideos: builder.query<IAnimeVideos[], number | string>({
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
            invalidatesTags: ["anime", "animeList", 'UserAnimeList']
        }),
        removeTag: builder.mutation({
            query: (data) => ({
                url: "tags/remove",
                method: "DELETE",
                body: data
            }),
            invalidatesTags: ["anime", "animeList", 'UserAnimeList']
        }),
        addAnime: builder.mutation<ICollection, ICollection>({
            query: (data) => ({
                url: "new",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["animeList"]
        }),
        updateAnime: builder.mutation<ICollection, { anime: ICollection, videos: IAnimeVideos[] }>({
            query: (data) => ({
                url: "update",
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["animeList", 'anime', 'UserAnimeList']
        }),
        deleteAnime: builder.mutation({
            query: (id) => ({
                url: "delete",
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: ["animeList", 'UserAnimeList']
        }),
        setAnimeStatus: builder.mutation<ICollection[], { status: number, animeID: number }>({
            query: ({status, animeID}) => ({
                url: "status",
                method: "PATCH",
                body: {status, animeID}
            }),
            invalidatesTags: ["animeList", 'UserAnimeList']
        }),
        getUserAnimeOverview: builder.query<AnimeListOverviewProps, string>({
            query: (userId) => `animeList/${userId}`,
            providesTags: ['UserAnimeList']
        }),
        getUserAnimeList: builder.query<{ anime: ICollection, status: number }[], {
            userId: string,
            animestatus: string
        }>({
            query: ({userId, animestatus}) => `animeList/${userId}/${animestatus}`,
            providesTags: ['UserAnimeList'],
        }),
    }),
});

export const {
    useGetAllAnimeQuery,
    useLazyGetAllAnimeQuery,
    useSetAnimeStatusMutation,
    useGetAllAnimeNPQuery,
    useGetAnimeByIdQuery,
    useGetAnimeVideosQuery,
    useAddTagToAnimeMutation,
    useRemoveTagMutation,
    useAddAnimeMutation,
    useUpdateAnimeMutation,
    useDeleteAnimeMutation,
    useDeleteAnimeVideoMutation,
    useGetUserAnimeOverviewQuery,
    useGetUserAnimeListQuery
} = AnimeAPI;
