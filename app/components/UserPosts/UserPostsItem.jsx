'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function UserPostsItem({ post, deletePost, show }) {
    const { _id, title, content, authorName } = post;

    return (
        <div className="w-full p-[10px] m-[10px]">
            {/* {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>} */}
            <p className="block text-2xl">{title}</p>
            <p className="block text-md">{content}</p>
            { show && <div>
                    <button id={_id} className="border border-black rounded-sm my-[5px] px-2" onClick={(e) => deletePost(e)}>Delete</button>
                </div>
            }
        </div>
    )
}
