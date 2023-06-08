import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnime, IAnimeVideos} from "../../types/Anime";

interface getArgs {
    page?: number;
    id?: string;
    passkey?: string;
    query?: any
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
            invalidatesTags: ["anime", "animeList"]
        }),
        removeTag: builder.mutation({
            query: (data) => ({
                url: "tags/remove",
                method: "DELETE",
                body: data
            }),
            invalidatesTags: ["anime", "animeList"]
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
            invalidatesTags: ["animeList", 'anime']
        }),
        deleteAnime: builder.mutation({
            query: (id) => ({
                url: "delete",
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: ["animeList"]
        }),
        setAnimeStatus: builder.mutation<IAnime[], { status: number, animeID: number }>({
            query: ({status, animeID}) => ({
                url: "status",
                method: "PATCH",
                body: {status, animeID}
            }),
            invalidatesTags: ["animeList"]
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
    useDeleteAnimeVideoMutation
} = AnimeAPI;
