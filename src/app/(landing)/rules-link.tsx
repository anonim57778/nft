"use client"
import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";


export default function RulesLink() {

    return (
        <Link href="/rules">
            <ShieldCheckIcon className="size-6 text-primary" />
        </Link>
    )
}