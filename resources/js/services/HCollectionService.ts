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
    getCollection: builder.query({
      query: (passkey) => ({
        url: '',
        method: 'POST',
        body: {passkey}
      }),
      providesTags: ['Title']
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
  useGetCollectionQuery
} = hcollectionAPI
