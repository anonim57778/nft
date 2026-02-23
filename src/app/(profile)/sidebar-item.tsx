"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react"
import { cn } from "~/lib/utils";


export type sidebarT = {
    name: string,
    href: string,
    icon: ReactNode
}

export function SidebarItem({
    item
} : {
    item: sidebarT
}) {
    const pathname = usePathname();

    return (
        <Link href={item.href} className={cn("px-3 py-2 rounded-[8px] flex gap-2 items-center text-accent duration-300 hover:bg-white/5 hover:text-primary", pathname == item.href && "bg-muted text-primary")}>
            {item.icon}

            <h1 className="text-base font-medium">{item.name}</h1>
        </Link>
    )
}

export function MobileSidebarItem({
    item
} : {
    item: sidebarT
}) {
    const pathname = usePathname();

    return (
        <Link href={item.href} className={cn("size-12 rounded-full flex justify-center items-center bg-muted text-primary", pathname == item.href && "bg-primary text-white")}>
            {item.icon}
        </Link>
    )
}