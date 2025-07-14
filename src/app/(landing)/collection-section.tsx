import { api } from "~/trpc/server";
import CardCollection from "./collection-card";


export default async function CollectionSection() {

    const collections = await api.collection.getAll({});

    return (
        <section className="py-10 lg:py-20 container flex flex-col gap-y-10 lg:gap-y-[60px]">
            <h1 className="text-2xl font-semibold lg:text-4xl">Откройте больше коллекций</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 lg:gap-[30px]">
                {collections.map((item, index) => (
                    <CardCollection key={index} item={item}/>
                ))}
            </div>
        </section>
    )
}