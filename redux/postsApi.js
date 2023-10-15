import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => `api/posts`,
        }),
        getUserPosts: build.query({
            query: (id) => `api/posts/${id}`,
        }),
        deletePosts: build.mutation({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { useGetPostsQuery, useGetUserPostsQuery, useDeletePostsMutation } = postsApi;