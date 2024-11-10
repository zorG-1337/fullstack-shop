import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { Menu } from "lucide-react";
import { SideBar } from "./SideBar";

export function MobileSidebar() {
    return <Sheet>
        <SheetTrigger className="lg:hidden pr-4 hover:opacity-75 transition">
            <Menu />
        </SheetTrigger>
        <SheetContent side='left' className="p-0 bg-white">
            <SideBar />
        </SheetContent>
    </Sheet>
}