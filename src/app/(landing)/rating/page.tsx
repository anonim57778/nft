import { api } from "~/trpc/server";
import ArtistCard from "../artist-card";


export default async function RatingPage() {

    const artists = await api.user.getLiders();

    return (
        <div className="container py-10 lg:py-20 flex flex-col gap-y-10 lg:gap-y-[60px]">
            <h1 className="text-2xl font-semibold lg:text-4xl">Топ артистов</h1>

            <div className="flex flex-col gap-y-5">
                <div className="border border-card rounded-[20px] text-secondary text-xs lg:text-base font-normal py-3 px-5 grid grid-cols-2 gap-[60px]">
                    <div className="flex gap-10">
                        <h1>#</h1>

                        <h1>Артист</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        <h1 className="hidden lg:block">Продажи</h1>

                        <h1 className="text-end lg:text-start">Баланс</h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5">
                    {artists.map((item, index) => (
                        <ArtistCard key={index} name={item.name ?? ""} variant="ranking" imageId={item.imageId} sold={item.sold} index={index + 1} balance={item.balance}/>
                    ))}
                </div>
            </div>
        </div>
    )
}