import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import CollectionImages from "./images";

export default async function CollectionPage({
    params
} : {
    params: Promise<{
        id: string
    }>
}) {
    const { id } = await params;

    const collection = await api.collection.getById({ id });

    if (!collection) {
        notFound();
    }

    return (
        <div className="overflow-hidden">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 lg:py-16">
                <CollectionImages imagesData={collection.imageIds ?? []} />

                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-4">
                        <h2 className="font-normal text-2xl lg:text-5xl">{collection.name}</h2>

                        <p className="font-normal text-xl">{collection.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}