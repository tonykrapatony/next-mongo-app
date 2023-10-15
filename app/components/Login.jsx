'use client'
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
    const session = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(email, password);
        if (email && password) {
            setError('');
            await signIn('credentials', { email, password, redirect: true, callbackUrl: '/profile' });
        } else {
            setError('Oops, something went wrong');
        }
    }

    return (
        <>
            <h1 className="mt-[50px] text-2xl">Login</h1>
            <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e)}>
                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <input className="w-full border border-black rounded-sm my-[5px] px-2" type="password" name="password" placeholder="Passsword" onChange={(e) => setPassword(e.target.value)}/>
                <button className="border border-black rounded-sm my-[5px] px-2" type="submit">Login</button>
            </form>
            <p className="text-red">{error}</p>
        </>
    )
}
