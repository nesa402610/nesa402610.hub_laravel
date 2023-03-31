import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {csrf_token} from "../mockData";

export const chatAPI = createApi({
    reducerPath: 'chatAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'api/chat',
        prepareHeaders: (headers) => {
            headers.set('X-CSRF-TOKEN', csrf_token)
            return headers
        },
    }),
    tagTypes: ['Message'],
    endpoints: build => ({
        getMessages: build.query({
            query: () => '',
            providesTags: ['Message']
        }),
        sendMessage: build.mutation({
            query: (message) => ({
                url: 'send',
                method: 'POST',
                body: message,
            }),
            invalidatesTags: ['Message']
        })
    })
})
export const {useGetMessagesQuery, useSendMessageMutation} = chatAPI
