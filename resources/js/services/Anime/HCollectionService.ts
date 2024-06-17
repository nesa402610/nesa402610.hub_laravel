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
    updateTitle: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["anime"]
    }),
  }),
});

export const {
  useUpdateTitleMutation
} = CollectionsAPI;
