'use client'

import React from 'react'
import { useGetUsersQuery } from "@/redux";
import UsersItem from './UsersItem';

export default function UsersList() {
    const {data = [], isLoading} = useGetUsersQuery();
    // console.log(data)
    return (
        <div className="w-full max-w-[500px] flex flex-col items-center gap-y-[20px]">
            { isLoading ? (
            <h1>Loading...</h1>
            ) : (
            data.map(({ _id, username, email, file, postsList }) => (
                <UsersItem key={_id} user={{ _id, username, email, file, postsList }} />
            ))
            )}
        </div>
    )
}
