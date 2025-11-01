import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import CardArt from "../../art-card";



export default async function ArtList({
    ownerId
} : {
    ownerId: string;
}) {
    const artsOwner = await api.art.getAll({
        ownerId: ownerId
    })

    return (
        <div className="container py-10 lg:py-20 flex flex-col gap-y-[30px] lg:gap-y-[60px]">

            <div className="flex justify-between items-start flex-col gap-y-4 lg:gap-y-0 lg:flex-row">
                <h1 className="text-4xl font-semibold">Больше от этого артиста</h1>

                <Link href={`/author/${ownerId}`} className="w-full lg:w-fit">
                    <Button variant={"secondary"}>
                        Страница артиста
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
                {artsOwner.map((nft, index) => (
                    <CardArt key={index} item={nft} index={index} className="bg-card"/>
                ))}
            </div>
        </div>
    )
}