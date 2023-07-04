import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {ICollectionTag} from "../../types/Tag";

export const TagAPI = createApi({
  reducerPath: "TagAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/tags",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["tag"],
  endpoints: build => ({
    getTags: build.query<ICollectionTag[], void>({
        query: () => "list",
        providesTags: ["tag"]
    }),
    createTag: build.mutation<ICollectionTag, string>({
      query: (data) => ({
          url: "new",
          method: "POST",
          body: data
      }),
      invalidatesTags: ["tag"]
    }),
    updateTag: build.mutation({
      query: (tag) => ({
        url: "update",
        method: "PATCH",
        body: tag
      }),
      invalidatesTags: ["tag"]
    }),
    deleteTag: build.mutation({
      query: ({tagID}) => ({
        url: "delete",
        method: "DELETE",
        body: tagID
      }),
      invalidatesTags: ["tag"]
    })
  })
});
export const {useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation} = TagAPI;
