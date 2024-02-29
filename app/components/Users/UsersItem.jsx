import React from 'react'
import Link from "next/link";

export default function UsersItem({ user }) {
    const { _id, username, email, file } = user;
    return (
        <Link href={'users/'+_id} className="w-full flex item-center flex-wrap p-10px">
            <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                <img className="w-full h-full" src={file} alt={username} />
            </div>
            <div className="px-[15px]">
                <p className="block text-2xl">{username}</p>
                <p className="block text-md">{email}</p>
            </div>
        </Link>
    )
}
