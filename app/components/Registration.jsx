'use client'
import React from 'react'
import { useState } from "react"
import { imageUploader } from '@/utils/imageUploader';
import { useRegisterUserMutation } from '@/redux';
import { useRouter  } from 'next/navigation';

export default function Registration() {
    const router = useRouter()
    const [registerUser] = useRegisterUserMutation();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setSelectedImage(file);
    };
  
    const submitHandler = async (e) => {
      e.preventDefault();
      if (username && email && password) {
        await imageUploader(selectedImage);
        let file;
        if (selectedImage) {
          file = `storage/images/${selectedImage.name}`;
        } else {
          file = 'images/profile.png';
        }
        try {
          const user = {
            username: username,
            email: email,
            file: file,
            password: password,
          };
          const { data, error } = await registerUser(user);
          if (data.status === 'ok') {
            setSuccess(data.message);
            setTimeout(() => {
              setSuccess('');
              router.push('/login');
            }, 2000);
            setError('');
          } else {
            setError(data.message);
          }
        } catch (error) {
          console.log(error)
          setError('An error occurred during registration');
        }
      } else {
        setError("Fill in the username, email and password fields")
      }
    }
    
    return (
        <>
            {error && <h1 className="mt-[50px] text-2xl text-red-700 text-center">{error}</h1>}
            {success && <h1 className="absolute top-[50px] mt-[50px] text-2xl text-green-700 text-center">{success}</h1>}
            <h1 className="mt-[50px] text-2xl">Register user</h1>
            <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e)}>
                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="text" name="username" placeholder="User name" onChange={(e) => setUsername(e.target.value)}/>
                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input className="w-full border border-black rounded-sm my-[5px]" type="file" name="file" accept="image/*" onChange={handleImageChange}/>
                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="password" name="password" placeholder="Passsword" onChange={(e) => setPassword(e.target.value)}/>
                <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Register</button>
            </form>
        </>
    )
}
