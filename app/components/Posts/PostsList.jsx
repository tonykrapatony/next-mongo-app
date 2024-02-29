import React from 'react'
import PostsItem from './PostsItem';

export default function PostsList({ posts, deletePost, updatePost, setSuccess }) {
    return (
        <div className="w-3/5">
            <h1 className="text-2xl p-[10px] m-[10px]">Posts:</h1>
            {
                posts && posts.map(({ _id, title, content, authorName }, index) => (
                    <PostsItem key={index} post={{ _id, title, content, authorName }} deletePost={deletePost} updatePost={updatePost} setSuccess={setSuccess}/>
                ))
            }
        </div>
    )
}
