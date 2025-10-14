import { createSearchParamsCache, type SearchParams } from "nuqs/server";
import { filterParams } from "./filter-params";
import { api } from "~/trpc/server";
import Search from "~/components/search";
import ListMarketplace from "./list";


const paramsCache = createSearchParamsCache(filterParams);
export default async function MarketplacePage({
    searchParams
} : {
    searchParams: SearchParams
}) {
    const params = paramsCache.parse(searchParams);

    const arts = await api.art.getAll({
        category: params.category ?? undefined,
        search: params.search ?? undefined,
    })

    const collections = await api.collection.getAll({
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

            <ListMarketplace arts={arts} collections={collections}/>
        </div>
    )
}