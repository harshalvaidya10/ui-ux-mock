import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

function ProjectHeader() {
    return (
        <div className='flex items-center justify-between p-3 shadow'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.png'} alt='logo' width={40} height={40}></Image>
                <h2 className='text-lg font-semibold'><span className='text-primary '>UI UX</span> MOCK</h2>
            </div>
            <Button><Save className='w-4 h-4' />Save</Button>
        </div>
    )
}

export default ProjectHeader
