import { createSearchParamsCache, SearchParams } from "nuqs/server";
import { filterParams } from "./filter-params";
import { api } from "~/trpc/server";
import CardNft from "../nft-card";
import Search from "~/components/search";


const paramsCache = createSearchParamsCache(filterParams);
export default async function MarketplacePage({
    searchParams
} : {
    searchParams: SearchParams
}) {
    const params = paramsCache.parse(searchParams);

    const nfts = await api.nft.getAll({
        category: params.category ?? undefined,
        search: params.search ?? undefined,
    })

    return (
        <div>
            <div className="py-10 lg:py-20 container flex flex-col gap-y-[30px]">
                <div className="flex flex-col gap-y-[10px]">
                    <h1 className="text-3xl lg:text-5xl font-semibold">Маркетплейс</h1>

                    <p className="text-base lg:text-2xl font-normal">Выбирайте из более чем 50 тысяч в нашем маркетплейсе</p>
                </div>

                <Search className="w-full"/>
            </div>

            <div className="bg-card py-10 lg:py-[60px]">
                {nfts.length > 0 ? (
                    <div className="container grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
                        {nfts.map((item, index) => (
                            <CardNft key={index} item={item} className="bg-background"/>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-center text-secondary text-xl lg:text-5xl">Нет nft с такими параметрами</h1>
                )}
            </div>
        </div>
    )
}