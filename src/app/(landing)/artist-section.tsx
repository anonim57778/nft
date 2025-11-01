import { Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import ArtistCard from "./artist-card";


export default async function ArtistSection() {

    const artists = await api.user.getLiders();

    return (
        <section className="container py-10 lg:py-20 flex flex-col gap-y-10 lg:gap-y-[60px]">
            <div className="flex justify-between lg:items-end flex-col lg:flex-row gap-y-4 lg:gap-y-0">
                <div className="flex flex-col gap-y-[10px]">
                    <h1 className="text-2xl font-semibold lg:text-4xl">Топ артистов</h1>

                    <p className="text-base font-normal lg:text-2xl">Следите за рейтингом</p>
                </div>

                <Link href={"/rating"}>
                    <Button className="flex gap-3 items-center" variant={"secondary"}>
                        <Rocket className="size-5 text-primary"/>
                        Рейтинг
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
                {artists.map((item, index) => (
                    <Link key={index} href={`/author/${item.id}`}>
                        <ArtistCard name={item.name ?? ""} imageId={item.imageId ?? undefined} sold={item.sold} index={index + 1}/>
                    </Link>
                ))}
            </div>
        </section>
    )
}