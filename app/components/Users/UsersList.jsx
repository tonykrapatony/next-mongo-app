'use client'
import React from 'react'
import UsersItem from './UsersItem';
import { useProfileQueries } from '@/helpers/helpers';

export default function UsersList() {

    const { getUsers } = useProfileQueries();
    const { data, isLoading } = getUsers()
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
