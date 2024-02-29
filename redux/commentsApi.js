import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getPostComments: build.query({
            query: (id) => `api/comments/${id}`,
        }),
        addComment: build.mutation({
            query: (body) => {
                return {
                    url: `api/comments`,
                    method: 'POST',
                    body,  
                }
            }
        }),
    })
})

export const { useGetPostCommentsQuery, useAddCommentMutation } = commentsApi;