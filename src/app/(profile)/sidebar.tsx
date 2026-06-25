import { User2, Heart, List, ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MobileSidebarItem, SidebarItem, sidebarT } from "./sidebar-item";


export default function ProfileSidebar() {


    const sidebarItems: sidebarT[] = [
        {
            name: "Назад",
            href: "/",
            icon: <ArrowLeft className="size-5"/>
        },
        {
            name: "Профиль",
            href: "/profile",
            icon: <User2 className="size-5"/>
        },
        {
            name: "Избранное",
            href: "/favorite",
            icon: <Heart className="size-5"/>
        },
        {
            name: "Арты и коллекции",
            href: "/arts-collections",
            icon: <List className="size-5"/>
        }
    ];

    return (
        <div>
            <div className="w-[250px] bg-black/20 h-full rounded-3xl p-6 flex-col gap-6 hidden lg:flex">
                <Link href={"/"} className="text-2xl font-bold text-primary pb-3 border-b border-b-muted text-left duration-300 hover:text-white/20">Пикассо</Link>

                <div className="grow flex flex-col gap-3">
                    {sidebarItems.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </div>
            </div>

            <div className="fixed z-50 bottom-2 left-0 w-full flex justify-center lg:hidden">
                <div className="rounded-full bg-white w-fit p-1 flex gap-3 border border-muted">
                    {sidebarItems.map((item, index) => (
                        <MobileSidebarItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}