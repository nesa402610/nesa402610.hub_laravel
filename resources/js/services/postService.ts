import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {csrf_token} from "../mockData";
import {IComment, IPost} from "../types/Post";

export const postAPI = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/blog',
        prepareHeaders: (headers) => {
            headers.set('X-CSRF-TOKEN', csrf_token)
            return headers
        },
    }),
    tagTypes: ['Post', 'CommentList', 'PostList'],
    endpoints: (builder) => ({
        getPosts: builder.query<IPost[], void>({
            query: () => ``,
            providesTags: ['PostList']
        }),
        getPostById: builder.query<IPost, string>({
            query: (id) => `${id}`,
            providesTags: ['Post']
        }),
        getPostComments: builder.query<IComment[], number>({
            query: (id) => ({
                url: `${id}/comments/list`
            }),
            providesTags: ['CommentList']
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: 'create',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['PostList']
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: 'update',
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['PostList']
        }),
        changeVisibility: builder.mutation({
            query: (id) => ({
                url: 'visibility',
                method: 'PATCH',
                body: {id}
            }),
            invalidatesTags: ['PostList']
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: 'delete',
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['PostList']
        }),
        createComment: builder.mutation({
            query: ({postId, comment}) => ({
                url: `${postId}/comments/create`,
                method: 'PUT',
                body: {postId, comment}
            }),
            invalidatesTags: ['CommentList']
        }),
        updateComment: builder.mutation({
            query: ({id, comment}) => ({
                url: `${id}/comments/update`,
                method: 'PATCH',
                body: {id, comment}
            }),
            invalidatesTags: ['CommentList']
        }),
        deleteComment: builder.mutation({
            query: ({postId, id}) => ({
                url: `${id}/comments/delete`,
                method: 'DELETE',
                body: {id}
            }),
            invalidatesTags: ['CommentList']
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
    useDeleteCommentMutation,
    useGetPostCommentsQuery
} = postAPI
