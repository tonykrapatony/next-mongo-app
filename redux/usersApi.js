import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `api/users`,
        }),
        getUser: build.query({
            query: (id) => `api/users/${id}`,
        }),
        registerUser: build.mutation({
            query: (body) => ({
                url: `api/users`,
                method: 'POST',
                body,  
            })
        }),
        updateUser: build.mutation({
            query({ id, ...body }) {
                // console.log(body)
                return {
                    url: `api/users/${id}`,
                    method: 'PUT',
                    body: body.user,
                }
            }
        })
    })
})

export const { useGetUsersQuery, useGetUserQuery, useRegisterUserMutation, useUpdateUserMutation} = usersApi;