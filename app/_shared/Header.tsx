"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { SignIn, SignInButton } from '@clerk/clerk-react'

function Header() {
    const { user } = useUser();
    return (
        <div className='flex items-center justify-between p-4'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.png'} alt='logo' width={40} height={40}></Image>
                <h2 className='text-lg font-semibold'><span className='text-primary '>UI UX</span> MOCK</h2>
            </div>
            <ul className="flex gap-5 items-center text-lg">
                <li className="hover:text-primary cursor-pointer">Home</li>
                <li className="hover:text-primary cursor-pointer">Pricing</li>
            </ul>
            {!user ? <SignInButton><Button>Get started</Button></SignInButton> : <UserButton></UserButton>}
        </div>
    )
}

export default Header
