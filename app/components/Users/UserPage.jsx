'use client'
import MainContainer from "@/app/components/MainContainer";
import UserPosts from "@/app/components/UserPosts/UserPostsList";
import { useGetUserPostsQuery, useGetUserQuery } from "@/redux";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserPage({ params }) {
    const { slug } = params;

    const { data } = useGetUserQuery(slug);
    const { currentData } = useGetUserPostsQuery(slug);
    console.log(currentData)

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (currentData) {
            setPosts(currentData);
        }
    }, [currentData])


    if (data && posts) {
        return (    
            <div className="w-full flex item-center gap-x-[20px] p-10px">
                <div className="w-1/2">
                    <div className="flex item-center">
                        <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                            <Image width={100} height={100} className="w-full h-full" src={`/${data.file}`} alt='User image' />
                        </div>
                        <div className="px-[15px]">
                            <p className="block text-2xl">{data.username}</p>
                            <p className="block text-md">{data.email}</p>
                        </div>
                    </div>
                </div>
                <UserPosts posts={posts}/>
            </div> 
        );
    }

    return (
        <></>
    )
  }