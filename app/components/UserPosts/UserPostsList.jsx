// import { useGetUserPostsQuery } from '@/redux';
import React from 'react'
import UserPostsItem from './UserPostsItem';
// import { useGetUserPostsQuery } from '@/redux';

export default function UserPosts({ show, posts, deletePost }) {
    // const { data = [], isLoading} = useGetUserPostsQuery(id);

    return (
        <div className="w-1/2">
            <h1 className="text-2xl p-[10px] m-[10px]">Posts:</h1>
            {
                posts && posts.map(({ _id, title, content, authorName }) => (
                    <UserPostsItem show={show} key={_id} post={{ _id, title, content, authorName }} deletePost={deletePost}/>
                ))
            }
        </div>
    )
}
