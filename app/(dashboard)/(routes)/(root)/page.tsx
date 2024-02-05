import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "@/lib/db";

export default async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }
  const isteacher = await db.teacher.findUnique({
    where:{
      userId
    }
  })

  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(userId);

  return (
    <div className="space-y-6">
      {
        !isteacher &&
      <Link href="/join">
      <div className="flex justify-between px-6 bg-yellow-100 py-2">
        <div className="mt-1 text-gray-600">
        Want to become an Instructor? 
        </div>
        <Button variant="ghost" size="sm">Join</Button>
      </div>
      </Link>}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard
            icon={Clock}
            label="In Progress"
            numberOfItems={coursesInProgress.length}
          />
          <InfoCard
            icon={CheckCircle}
            label="Completed"
            numberOfItems={completedCourses.length}
            variant="success"
          />
        </div>
        <CoursesList
          items={[...coursesInProgress, ...completedCourses]}
        />
      </div>
    </div>
  )
}