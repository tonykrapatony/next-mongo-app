"use client";
import PostsList from "@/app/components/Posts/PostsList";
import { useProfileQueries } from "@/helpers/helpers";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserPage({ params }) {
  const { slug } = params;

  const { getUser, useGetUserPosts } = useProfileQueries();
  const { userInfo } = getUser(slug);
  console.log(userInfo)
  const { usrPosts } = useGetUserPosts(slug);
  console.log(usrPosts)

  const [success, setSuccess] = useState('');
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    if (usrPosts) {
      setPosts(usrPosts);
    }
  }, [usrPosts]);

  if (userInfo && posts) {
        return (
            <div className="w-full flex item-center gap-x-[20px] p-10px">
                {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>}
                <div className="w-1/2">
                <div className="flex item-center">
                    <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                    <Image
                        width={100}
                        height={100}
                        className="w-full h-full"
                        src={`/${userInfo.file}`}
                        alt="User image"
                    />
                    </div>
                    <div className="px-[15px]">
                    <p className="block text-2xl">{userInfo.username}</p>
                    <p className="block text-md">{userInfo.email}</p>
                    </div>
                </div>
                </div>
                <PostsList posts={posts} setSuccess={setSuccess} />
            </div>
        );
  }

  return <></>;
}
