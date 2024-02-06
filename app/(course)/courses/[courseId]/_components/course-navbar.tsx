import { Chapter, Course, UserProgress } from "@prisma/client"


import { CourseMobileSidebar } from "./course-mobile-sidebar";
import { UserButton } from "@clerk/nextjs";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {



  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <div className="w-full flex justify-between">
      <div className=""></div>
      <UserButton/>      
      </div>
    </div>
  )
}