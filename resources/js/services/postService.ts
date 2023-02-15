import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const csrf_token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export const postAPI = createApi({
  reducerPath: 'postApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/blog',
    prepareHeaders: (headers) => {
      headers.set('X-CSRF-TOKEN', csrf_token)
      return headers
    },
  }),
  tagTypes: ['Post', 'Comment'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => `/`,
      providesTags: ['Post']
    }),
    getPostById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Post', 'Comment']
    }),
    createPost: builder.mutation({
      query: (data) => ({
        url: 'create',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Post']
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: 'update',
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Post']
    }),
    changeVisibility: builder.mutation({
      query: (id) => ({
        url: 'visibility',
        method: 'PATCH',
        body: {id}
      }),
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: 'delete',
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: ['Post']
    }),
    createComment: builder.mutation({
      query: ({postId, comment}) => ({
        url: 'comments/create',
        method: 'PUT',
        body: {postId, comment}
      }),
      invalidatesTags: ['Comment']
    }),
    updateComment: builder.mutation({
      query: ({id, comment}) => ({
        url: 'comments/update',
        method: 'PATCH',
        body: {id, comment}
      }),
      invalidatesTags: ['Comment']
    }),
    deleteComment: builder.mutation({
      query: (postId) => ({
        url: 'comments/delete',
        method: 'DELETE',
        body: postId
      }),
      invalidatesTags: ['Comment']
    })
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useChangeVisibilityMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = postAPI
