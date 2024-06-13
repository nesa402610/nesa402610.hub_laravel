import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnimeVideos} from "types/Anime";
import {ICollection, paginatedData} from "types/types";

interface getArgs {
    page?: number;
    id?: string;
    passkey?: string;
    query?: any
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
    tagTypes: ["anime", "videos", "animeList", 'UserAnimeList', 'AnimeListRandom'],
    endpoints: (builder) => ({
        getAllAnime: builder.query<paginatedData<ICollection[]>, getArgs>({
            query: ({page = 1, query = null}) => ({
                url: "list?page=" + page,
                method: "POST",
                body: {...query}
            }),
            providesTags: ['animeList']
        }),
        getAnimeById: builder.query<ICollection, string>({
            query: (id) => id,
            providesTags: ["anime"]
        }),
        getAllAnimeNP: builder.query<ICollection[], void>({
            query: () => ({
                url: "all",
                method: "GET",
            }),
            providesTags: ["animeList"]
        }),
        getAnimeDuplies: builder.query<ICollection[], void>({
            query: () => ({
                url: 'duplies'
            }),
        }),
        deleteAnimeDuplies: builder.mutation<ICollection[], void>({
            query: () => ({
                url: 'duplies/delete',
                method: 'delete',
            }),
        }),
        getAnimeVideos: builder.query<IAnimeVideos[], string | number>({
            query: (id) => ({
                url: id + "/videos",
            }),
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
        setAnimeStatus: builder.mutation<{ userStatus: { status: number } }, { status: number, animeID: number }>({
            query: ({status, animeID}) => ({
                url: "status",
                method: "PATCH",
                body: {status, animeID}
            }),
            async onQueryStarted({animeID}, {dispatch, queryFulfilled}) {
                try {
                    const {data: updatedStatus} = await queryFulfilled
                    dispatch(
                        AnimeAPI.util.updateQueryData('getAnimeById', String(animeID), (draft) => {
                            Object.assign(draft, updatedStatus)
                        })
                    )
                } catch (error) {
                    console.error("Failed to update status:", error);
                }
            },
            // invalidatesTags: ["animeList", 'UserAnimeList', 'anime']
        }),
        getUserAnimeOverview: builder.query<AnimeListOverviewProps, string>({
            query: (userId) => `animeList/${userId}`,
            providesTags: ['UserAnimeList']
        }),
        getUserAnimeList: builder.query<ICollection[], {
            userId: string,
            animestatus: string
        }>({
            query: ({userId, animestatus}) => `animeList/${userId}/${animestatus}`,
            providesTags: ['UserAnimeList'],
        }),
        getRandomAnimeList: builder.query<ICollection[], void>({
            query: () => `list/random`,
            providesTags: ['AnimeListRandom'],
        }),
        setScoreToAnime: builder.mutation<null, { id: number, score: number }>({
            query: ({id, score}) => ({
                url: `${id}/score`,
                method: "POST",
                body: {id, score}
            }),
            invalidatesTags: ["anime", "animeList", 'UserAnimeList']
        }),
        setWatchedEpisode: builder.mutation<number, { id: number, plusOrMinus: 'plus' | 'minus' }>({
            query: ({id, plusOrMinus = 'plus'}) => ({
                url: `${id}/watchedEpisodes/${plusOrMinus}`,
                method: "POST",
            }),
            // invalidatesTags: ["anime", "animeList", 'UserAnimeList'],
            async onQueryStarted({id}, {dispatch, queryFulfilled}) {
                try {
                    const {data: updatedEpisodes} = await queryFulfilled
                    dispatch(
                        AnimeAPI.util.updateQueryData('getAnimeById', String(id), (draft) => {
                            Object.assign(draft, updatedEpisodes)
                        })
                    )
                } catch (error) {
                    console.error("Failed to update status:", error);
                }
            },
        }),
    }),
});

export const {
    useGetAllAnimeQuery,
    useDeleteAnimeDupliesMutation,
    useLazyGetAllAnimeQuery,
    useGetAnimeDupliesQuery,
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
    useGetUserAnimeListQuery,
    useGetRandomAnimeListQuery,
    useSetScoreToAnimeMutation,
    useSetWatchedEpisodeMutation
} = AnimeAPI;
