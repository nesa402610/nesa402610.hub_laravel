import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnimeTag, ITags} from "types/Tag";

interface TagsAndGenres {
    tags: {
        rx: ITags[]
        ff: ITags[]
    },
    genres: {
        rx: ITags[]
        ff: ITags[]
    },
    total: number
}

export const TagAPI = createApi({
    reducerPath: "TagAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/tags",
        prepareHeaders: (headers) => {
            headers.set("X-CSRF-TOKEN", csrf_token);
            return headers;
        },
    }),
    tagTypes: ["tags"],
    endpoints: build => ({
        getAdminTags: build.query<TagsAndGenres, void>({
            query: () => "",
            providesTags: ['tags']
        }),
        getTags: build.query<{ tags: ITags[], genres: ITags[] }, void>({
            query: () => "list",
        }),
        createTag: build.mutation<IAnimeTag, string>({
            query: (data) => ({
                url: "new",
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["tags"]
        }),
        updateTag: build.mutation({
            query: (tag) => ({
                url: "update",
                method: "PATCH",
                body: tag
            }),
            invalidatesTags: ["tags"]
        }),
        deleteTag: build.mutation({
            query: ({id, type}) => ({
                url: "delete",
                method: "DELETE",
                body: {id, type}
            }),
            invalidatesTags: ["tags"]
        })
    })
});
export const {
    useGetTagsQuery,
    useGetAdminTagsQuery,
    useCreateTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation
} = TagAPI;
