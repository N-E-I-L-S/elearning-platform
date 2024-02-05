import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
// import { isTeacher } from "@/lib/teacher";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if(!userId){
        return new NextResponse("Unauthorized", { status: 401 });
    }
    const isteacher = await db.teacher.findUnique({
        where: {
            userId
        }
    })

    if (isteacher) {
      return new NextResponse("[ADD TEACHER] Data already exists", { status: 409 });
    }

    const teacher = await db.teacher.create({
      data: {
        userId,
        name,
      }
    });

    return NextResponse.json(teacher);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}