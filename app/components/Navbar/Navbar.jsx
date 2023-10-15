'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  const session = useSession();
  
  return (
    <header className='flex items-center justify-between p-[10px]'>
        <Link className='px-[5px] hover:text-gray-600 hover:underline cursor-pointer' href="/">Logo</Link>
        <nav>
            <Link className='px-[5px] hover:text-gray-600 hover:underline' href="/users">Users</Link>
            {
              session?.data ?
                ''
              :
                <Link className='px-[5px] hover:text-gray-600 hover:underline' href="/registration">Register</Link>
            }
            {
              session?.data && (
                <Link className='px-[5px] hover:text-gray-600 hover:underline' href='/profile'>Profile</Link>
              )
            }
            {
              session?.data ?
                <Link className='px-[5px] hover:text-gray-600 hover:underline' href="#" onClick={() => signOut({callbackUrl: '/'})}>Logout</Link>
              :
                <Link className='px-[5px] hover:text-gray-600 hover:underline' href='/login'>Login</Link>
            }
        </nav>
    </header>
  )
}
