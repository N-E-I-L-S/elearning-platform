import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(
    req:Request,
    {params}:{params: {courseId: string}}
    ) {
        try{
            const {userId} = auth()
            const {title} = await req.json()
            
            if(!userId)
            return new NextResponse("Not authenticated", {status: 401})
            
            const isteacher = await db.teacher.findUnique({
                where:{
                    userId
                }
            })
            if(isteacher)
            return new NextResponse("Not authenticated", {status: 401})

            const courseOwner = await db.course.findUnique(
                {
                    where:{
                        id: params.courseId,
                        userId: userId
                    }
                }
            )
            if(!courseOwner)
            return new NextResponse("Unauthorized", {status: 401})

            const lastchapter = await db.chapter.findFirst({
                where:{
                    courseId: params.courseId
                },
                orderBy:{
                    position: "desc"
                }
            })

            const newposition = lastchapter ? lastchapter.position+1 : 1

            const chapter = await db.chapter.create({
                data:{
                    title, 
                    courseId : params.courseId,
                    position: newposition
                }
            })
            return NextResponse.json(chapter)
        
        }
        catch(error){
            console.log("[CHAPTERS] ", error)
            return new NextResponse("Internal Error", {status: 500})
        }
    
}