"use client"
import Link from "next/link";


export default function RulesLink({
    children
} : {
    children: React.ReactNode;
}) {

    return (
        <Link href="/rules">
            {children}
        </Link>
    )
}