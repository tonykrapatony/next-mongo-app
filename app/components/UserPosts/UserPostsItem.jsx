'use client'
import { useDeletePostsMutation } from '@/redux';
import React, { useState } from 'react'

export default function UserPostsItem({ post, deletePost }) {
    const { _id, title, content, authorName } = post;

    // const [success, setSuccess] = useState('');

    // const [deletePosts] = useDeletePostsMutation();

    // const deleteHandler = async (e) => {
    //     e.preventDefault();
        
    //     try {
    //         const { data, error } = await deletePosts(_id);
    //         if (data && data.status === 'ok') {
    //             console.log(data)
    //             setSuccess(data.message);
    //             setTimeout(() => {
    //                 setSuccess('')
    //                 window.location.reload();
    //             }, 2000);
    //         } else {
    //             console.error('Помилка видалення поста:', error);
    //         }
    //     } catch (error) {
    //         console.error('Помилка видалення поста:', error);
    //     }
    // };

    return (
        <div className="w-full p-[10px] m-[10px]">
            {/* {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>} */}
            <p className="block text-2xl">{title}</p>
            <p className="block text-md">{content}</p>
            <div>
                <button id={authorName} className="border border-black rounded-sm my-[5px] px-2" onClick={(e) => deletePost(e)}>Delete</button>
            </div>
        </div>
    )
}
