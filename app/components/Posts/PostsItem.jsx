"use client";
import { useProfileQueries } from "@/helpers/helpers";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function UserPostsItem({post, deletePost, updatePost, setSuccess }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [edit, setEdit] = useState(false);
  const [postContent, setPostContent] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentsList, setCommentsList] = useState(null);
  const [commemtContent, setCommemtContent] = useState(false);
  const { _id, title, content, authorName } = post;

  const { getPostComments, addComment } = useProfileQueries();
  const { comments, isLoading } = getPostComments(_id);

  const editHandler = () => {
    setEdit(!edit);
  };

  const updateHandler = async () => {
    const res = await updatePost(_id, postContent);
    if (res) {
      setEdit(!edit);
    }
  };

  const addCommentPost = async () => {
    try {
      const commetnBody = {
        content: commemtContent,
        id: _id,
        authorName: session?.user?.username,
      };
      const newComment = await addComment(commetnBody);

      if (newComment) {
        // console.log(newComment);
        setSuccess(newComment.data.message);
        setComment(!comment);
        setCommentsList(prevComments => [...prevComments, commetnBody]);
        setTimeout(() => {
          setSuccess(null);
        }, 2000);
        return true;
      } else {
        throw new Error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    setPostContent(content);
  }, []);

  useEffect(() => {
    setCommentsList(comments?.comments);
  }, [comments?.comments])

  return (
    <div className="w-full">
      {/* {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>} */}
      <div className="p-3 m-5 border-l-4 border-black">
        <p className="block text-2xl">{title}</p>
        {!edit && (
          <p className="block text-md whitespace-pre-line">{postContent}</p>
        )}
        {edit && (
          <textarea
            cols="50"
            rows="10"
            className="w-full border border-black rounded-sm my-[5px] px-2"
            type="text"
            value={postContent}
            onInput={(e) => setPostContent(e.target.value)}
          ></textarea>
        )}
        <div className="flex items-center gap-1 pt-1">
          {pathname === "/profile" && (
            <button
              id={_id}
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={(e) => deletePost(e)}
            >
              <span>Delete</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/delete.png"}
                alt="Delete icon"
              />
            </button>
          )}
          {session && (
            <button
              id={_id}
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={(e) => setComment(!comment)}
            >
              <span>Comment</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/comment.png"}
                alt="Comment icon"
              />
            </button>
          )}
          {!edit && pathname === "/profile" && (
            <button
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={editHandler}
            >
              <span>Edit</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/edit.png"}
                alt="Edit icon"
              />
            </button>
          )}
          {edit && pathname === "/profile" && (
            <button
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={() => {
                setPostContent(content);
                setEdit(!edit);
              }}
            >
              <span>Cancel</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/close.png"}
                alt="Edit icon"
              />
            </button>
          )}
          {edit && pathname === "/profile" && (
            <button
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={updateHandler}
            >
              <span>Save</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/save.png"}
                alt="Save icon"
              />
            </button>
          )}
        </div>
      </div>
      {comment && (
        <div className="w-full pl-3 m-5">
          <textarea
            cols="50"
            rows="5"
            className="w-full border border-black rounded-sm my-[5px] px-2"
            type="text"
            onInput={(e) => setCommemtContent(e.target.value)}
          ></textarea>
          <div className="flex items-center gap-1 pt-1 pl-1">
            <button
              className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={addCommentPost}
            >
              <span>Add</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/comment_add.png"}
                alt="Comment add icon"
              />
            </button>
            <button className="flex items-center gap-1 border border-black rounded-sm p-1"
              onClick={(e) => {
                setComment(!comment);
                setCommemtContent(null);
              }}
            >
              <span>Cancel</span>
              <Image
                width={24}
                height={24}
                src={"/images/icons/close.png"}
                alt="Comment cancel icon"
              />
            </button>
          </div>
        </div>
      )}
      { !isLoading && commentsList && commentsList.length > 0 && (
        <div className="p-4 m-5">
          <p className="block text-2xl mb-2">Comments:</p>
          <ul className="flex flex-col gap-2">
            {commentsList.map(({ _id, content, authorName }, index) => (
              <li className=" border-l border-gray-500 p-2" key={index}>
                <p className="">{content}</p>
                <p>Author: {authorName}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
