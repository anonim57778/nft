"use client";
import { Pen } from "lucide-react";
import { Art } from "~/lib/shared/types/art";
import CreateArt from "./create-art";
import { api } from "~/trpc/react";

export default function UpdateArt({
    art,
} : {
    art: Art;
}) {
    const {data: session} = api.user.session.useQuery();

    if (!session?.session) {
        return null;
    }

    if (session.session.user.id !== art.owner.id) {
        return null;
    }

    return (
        <div className="size-9 absolute top-3 left-3 z-20 cursor-pointer bg-black/50 rounded-full flex justify-center items-center transition-all hover:size-11">
            <CreateArt art={art}>
                <Pen className="size-6 text-primary"/>
            </CreateArt>
        </div>
    )
}