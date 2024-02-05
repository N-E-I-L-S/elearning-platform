import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const TeacherLayout = async({
  children
}: {
  children: React.ReactNode;
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const isteacher = await db.teacher.findUnique({
    where:{
      userId
    }
  })
  if (!isteacher) {
    return redirect("/");
  }
  

  return <>{children}</>
}
 
export default TeacherLayout;