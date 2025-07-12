import { Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import CardNft from "./nft-card";


export default async function NftSection() {

    const nft = await api.nft.getMain();

    return (
        <section className="py-10 lg:py-20 container flex flex-col gap-y-10 lg:gap-y-[60px]">
            <div className="flex justify-between lg:items-end flex-col lg:flex-row gap-y-4 lg:gap-y-0">
                <div className="flex flex-col gap-y-[10px] text-white">
                    <h1 className="text-2xl font-semibold lg:text-4xl">Откройте больше NFT</h1>

                    <p className="text-base font-normal lg:text-2xl">Исследуйте новые NFT</p>
                </div>

                <Link href={"/marketplace"}>
                    <Button className="flex gap-3 items-center" variant={"secondary"}>
                        <Eye className="size-5 text-primary"/>
                        Посмотреть все
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                {nft.map((item, index) => (
                    <CardNft key={index} item={item} className="bg-card"/>
                ))}
            </div>

        </section>
    )
}