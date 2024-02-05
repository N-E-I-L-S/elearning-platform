import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "./mobile-sidebar"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export const Navbar = async() => {
  const {userId} = auth()
  if(!userId)
  {
    return "Sign in"
  }
  
    const isteacher = await db.teacher.findUnique({
      where:{
        userId
      }
    })

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes isTeacher={isteacher ? true : false}/>
    </div>
  )
}