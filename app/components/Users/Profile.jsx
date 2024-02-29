'use client'
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import PostsList from "../Posts/PostsList";
import { useProfileQueries } from "@/helpers/helpers";

export default function Profile() {
    const { data: session, status, update  } = useSession()  
    const { updateUser, deletePosts, updatePost, addCommentPost } = useProfileQueries();
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [edit, setEdit] = useState({
        username: false,
        email: false
    });

    useEffect(() => {
        if (session?.user?.id) {
            getUserPosts(session.user.id);
        }
        if (status === 'authenticated') {
            setUser(session.user);
        }
    }, [status, session?.user])


    const getUserPosts = async (id) => {
        try {
            const response = await fetch(`api/posts/${id}`);
            if (response.ok) {
                const data = await response.json();
                setPosts(data)
            } else {
                console.log('error');
            }
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const addPostHandler = async (e) => {
        e.preventDefault();
        if (title && content) {
            try {
                const newPost = {
                    title: title,
                    content: content,
                    id: session.user?.id,
                    authorName: session.user?.username,
                };
                const response = await fetch('api/posts', {
                    method: 'POST',
                    body: JSON.stringify(newPost)
                })
                if (response.error) {
                    // console.log('Error:', response.error);
                    setError(response.message.error);
                } else {
                    const data = await response.json();
                    setError('');
                    setSuccess(data.message);
                    getUserPosts(session.user.id);
                    setTitle('');
                    setContent('');
                    setTimeout(() => {
                        setSuccess('');
                        // window.location.reload();
                    }, 2000);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    const deletePostHandler = async (e) => {
        e.preventDefault();
        console.log(e.target.id);
        let id = e.target.id;
        try {
            const { data, error } = await deletePosts(id);
            if (data && data.status === 'ok') {
                console.log(data)
                setSuccess(data.message);
                getUserPosts(session.user.id);
                setTimeout(() => {
                    setSuccess('')
                    // window.location.reload();
                }, 2000);
            } else {
                console.error('Error deleting post:', error);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const updatePostHandler = async (id, content) => {
        const postContent = content;
        try {
            const updatedPostData = await updatePost({ id, postContent });

            if (updatedPostData.data.status === 'ok') {
                console.log(updatedPostData);
                setSuccess(updatedPostData.data.message);
                setTimeout(() => {
                    setSuccess(null);
                }, 2000);
                return true;
            } else {
                throw new Error('Failed to update user')
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }


    const handleEditClick = (field) => {
        setEdit((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleUpdatedUser = (field, e) => {
        console.log(e)
        setUser((prevState) => ({
            ...prevState,
            [field]: e,
        }))
    }

    const handleSaveClick = async () => {
        const id = user.id;

        try {
            const updatedUserData = await updateUser({ id, user });

            if (updatedUserData.data.status === 'ok') {
                setSuccess(updatedUserData.data.message);
                setTimeout(() => {
                    setSuccess('')
                }, 2000);
                update({
                    username: user.username,
                    email: user.email,
                });
                setEdit({
                    username: false,
                    email: false
                })
                console.log(user)
            } else {
                throw new Error('Failed to update user')
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            {error && <h1 className="mt-[50px] text-2xl text-red-700 text-center">{error}</h1>}
            {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>}
            { user && 
                <div className="w-full flex item-center gap-x-[20px] p-10px">
                    <div className="w-2/5">
                        <div className="w-full">
                            <div className="flex items-start">
                                <div className="w-[100px] h-[100px] rounded-[50%] overflow-hidden">
                                    <Image width={100} height={100} className="w-full h-full" src={`/${user.file}`} alt='User image' />
                                </div>
                            </div>
                            <div className="px-[15px]">
                                <div className="flex items-center">
                                    { !edit.username && <p className="block text-2xl">{user.username}</p>}
                                    { edit.username && <input className="border border-black rounded-sm my-[5px] px-2" type="text" value={user.username} onInput={(e) => handleUpdatedUser('username', e.target.value)}/>}
                                    { !edit.username && <button className="border border-black rounded-sm my-[5px] mx-[5px]" onClick={() => handleEditClick('username')}>
                                        <Image width={24} height={24} src={'/images/icons/edit.png'} alt="Edit icon"/>
                                    </button>
                                    }
                                    { edit.username && <button className="border border-black rounded-sm my-[5px] mx-[5px]" onClick={() => handleEditClick('username')}>
                                        <Image width={24} height={24} src={'/images/icons/close.png'} alt="Edit icon"/>
                                    </button>
                                    }
                                    { edit.username && <button className="border border-black rounded-sm my-[5px]"  onClick={() => handleSaveClick()}>
                                        <Image width={24} height={24} src={'/images/icons/save.png'} alt="Save icon"/>
                                    </button>
                                    }
                                </div>
                                <div className="flex items-center">
                                    { !edit.email && <p className="block text-md">{user.email}</p>}
                                    { edit.email && <input className="border border-black rounded-sm my-[5px] px-2" type="text" value={user.email} onInput={(e) => handleUpdatedUser('email', e.target.value)}/>}
                                    { !edit.email && <button className="border border-black rounded-sm my-[5px] mx-[5px]" onClick={() => handleEditClick('email')}>
                                        <Image width={24} height={24} src={'/images/icons/edit.png'} alt="Edit icon"/>
                                    </button>
}
                                    { edit.email && <button className="border border-black rounded-sm my-[5px] mx-[5px]" onClick={() => handleEditClick('email')}>
                                        <Image width={24} height={24} src={'/images/icons/close.png'} alt="Edit icon"/>
                                    </button>
                                    }
                                    { edit.email &&<button className="border border-black rounded-sm my-[5px]"  onClick={() => handleSaveClick()}>
                                        <Image width={24} height={24} src={'/images/icons/save.png'} alt="Save icon"/>
                                    </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <form className="flex flex-col items-center" onSubmit={(e) => addPostHandler(e)}>
                                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" value={title} name="title" placeholder="Post title" onChange={(e) => setTitle(e.target.value)}/>
                                <textarea className="w-full border border-black rounded-sm my-[5px] px-2" value={content} name="content" cols="30" rows="10" placeholder="Post text" onChange={(e) => setContent(e.target.value)}></textarea>
                                <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Add post</button>
                            </form>
                        </div>
                    </div>
                    <PostsList posts={ posts } updatePost={updatePostHandler} deletePost={ deletePostHandler } setSuccess={setSuccess}/>
                </div>  
            }
        </>
    )
}
