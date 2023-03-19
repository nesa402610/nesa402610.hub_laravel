import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export const hcollectionAPI = createApi({
  reducerPath: 'hcollectionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/NULL',
    prepareHeaders: (headers) => {
      headers.set('X-CSRF-TOKEN', csrf_token)
      return headers
    },
  }),
  tagTypes: ['Title'],
  endpoints: (builder) => ({
    getCollectionTags: builder.query({
      query: () => ({
        url: '/tags',
      }),
      providesTags: ['Title']
    }),
    getCollection: builder.query({
      query: (passkey) => ({
        url: '',
        method: 'POST',
        body: {passkey}
      }),
      providesTags: ['Title']
    }),
    getCollectionById: builder.query({
      query: ({id, passkey}) => ({
        url: `${id}`,
        method: 'POST',
        body: {passkey, id}
      }),
    }),
    addTagToCollection: builder.mutation({
      query: (data) => ({
        url: 'tags/add',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Title']
    }),
    removeTag: builder.mutation({
      query: (data) => ({
        url: 'tags/delete',
        method: 'DELETE',
        body: data
      }),
      invalidatesTags: ['Title']
    }),
    addTitle: builder.mutation({
      query: (data) => ({
        url: 'create',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Title']
    }),
    updateTitle: builder.mutation({
      query: (data) => ({
        url: 'update',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Title']
    }),
    deleteTitle: builder.mutation({
      query: (id) => ({
        url: 'delete',
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: ['Title']
    }),
  }),
})

export const {
  useLazyGetCollectionQuery,
  useGetCollectionQuery,
  useGetCollectionByIdQuery,
  useGetCollectionTagsQuery,
  useAddTagToCollectionMutation,
  useRemoveTagMutation,
  useUpdateTitleMutation
} = hcollectionAPI
