import React from 'react'
import { Navbar } from './_components/join-navbar'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import JoinForm from './_components/join-form'
export default async function JoinPage() {
    const { userId } = auth()
    if (!userId)
        return redirect("/")
    const isteacher = await db.teacher.findUnique({
        where:{
            userId 
        }
    })
    if(isteacher){
       return redirect("/");
    }

    return (
        <>
        <div className="">
            <Navbar />
            
            <div className="flex items-center justify-center w-full">
            <JoinForm/>
            </div>
        </div>
        </>
    )
}
