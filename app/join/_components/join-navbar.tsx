import { NavbarRoutes } from "@/components/navbar-routes"

import { MobileSidebar } from "@/app/(dashboard)/_components/mobile-sidebar"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
    return (
        <div className="p-4 border-b h-full flex justify-between w-full items-center bg-white shadow-sm">
            <Link href="/" className="">
                <Button variant="ghost" size="sm">
                    Back
                </Button>
            </Link>
            <UserButton />
        </div>
    )
}