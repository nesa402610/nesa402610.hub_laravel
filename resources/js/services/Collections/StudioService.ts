import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../../mockData";
import {IAnimeStudio} from "../../types/Anime";

export const StudioAPI = createApi({
  reducerPath: "StudioAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/anime/studios",
    prepareHeaders: (headers) => {
      headers.set("X-CSRF-TOKEN", csrf_token);
      return headers;
    },
  }),
  tagTypes: ["studio"],
  endpoints: (builder) => ({
    getAllStudios: builder.query({
      query: () => ({
        url: "list"
      }),
      providesTags: ["studio"]
    }),
      createStudio: builder.mutation<IAnimeStudio[], IAnimeStudio>({
          query: (data) => ({
              url: "create",
              method: "PUT",
              body: data
          }),
          invalidatesTags: ["studio"]
      }),
    updateStudio: builder.mutation({
      query: (data) => ({
        url: "update",
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["studio"]
    }),
    deleteStudio: builder.mutation({
      query: (id) => ({
        url: "delete",
        method: "DELETE",
        body: {id}
      }),
      invalidatesTags: ["studio"]
    }),
  }),
});

export const {
  useCreateStudioMutation,
  useUpdateStudioMutation,
  useDeleteStudioMutation,
  useGetAllStudiosQuery
} = StudioAPI;
