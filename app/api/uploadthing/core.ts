import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
// import { isTeacher } from "@/lib/teacher";
 
const f = createUploadthing();

async function isTeacher(userId:string){

  const res = await db.teacher.findUnique({
    where:{
      userId
    }
  })
}

const handleAuth = () => {
  const { userId } = auth();

  if(userId)
  {
    const isAuthorized = isTeacher(userId); 
    if (!userId || !isAuthorized) throw new Error("Unauthorized");
    return { userId };
  }
  return {userId}
}

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;