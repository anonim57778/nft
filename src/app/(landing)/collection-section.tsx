import { api } from "~/trpc/server";
import CardCollection from "./collection-card";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Eye } from "lucide-react";


export default async function CollectionSection() {

    const collections = await api.collection.getAll({});

    return (
        <section className="py-10 lg:py-20 container flex flex-col gap-y-10 lg:gap-y-[60px]">
            <div className="flex justify-between lg:items-end flex-col lg:flex-row gap-y-4 lg:gap-y-0">
                <div className="flex flex-col gap-y-[10px] text-white">
                    <h1 className="text-2xl font-semibold lg:text-4xl">Откройте больше коллекций</h1>

                    <p className="text-base font-normal lg:text-2xl">Найдите больше коллекций</p>
                </div>

                <Link href={"/marketplace"}>
                    <Button className="flex gap-3 items-center" variant={"secondary"}>
                        <Eye className="size-5 text-primary"/>
                        Посмотреть все
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-[30px]">
                {collections.map((item, index) => (
                    <CardCollection key={index} item={item}/>
                ))}
            </div>
        </section>
    )
}