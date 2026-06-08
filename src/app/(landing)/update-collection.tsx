"use client";
import { Pen } from "lucide-react";
import { api } from "~/trpc/react";
import { Collection } from "~/lib/shared/types/collection";
import CreateCollection from "./create-collection";

export default function UpdateCollection({
    collection,
} : {
    collection: Collection;
}) {
    const {data: session} = api.user.session.useQuery();

    if (!session?.session) {
        return null;
    }

    if (session.session.user.id !== collection.owner?.id) {
        return null;
    }

    return (
        <div className="size-9 absolute top-3 left-3 z-20 cursor-pointer bg-black/50 rounded-full flex justify-center items-center transition-all hover:size-11">
            <CreateCollection collection={collection}>
                <Pen className="size-6 text-primary"/>
            </CreateCollection>
        </div>
    )
}