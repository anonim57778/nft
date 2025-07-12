import { nftCategoriesEnum } from "~/server/db/schema";
import Image from "next/image";
import Link from "next/link";
import { CategoriesToString } from "~/lib/enums";
import { categoriesData } from "~/lib/shared/types/category";
import { NftCategoryEnum } from "~/server/db/schema";

function CategoryCard({
    item
} : {
    item : NftCategoryEnum
}) {

    return (
        <Link href={categoriesData[item]!.url} className="rounded-[20px] overflow-hidden cursor-pointer">
            <Image
                src={categoriesData[item]!.image}
                alt={categoriesData[item]!.name}
                className="object-cover aspect-square w-full"
            />

            <div className="bg-card py-6 px-7">
                <h1 className="text-2xl text-white font-semibold">{CategoriesToString(categoriesData[item]!.name as NftCategoryEnum)}</h1>
            </div>
        </Link>
    )
}


export default function CategoriesSection() {

    return (
        <section className="container py-10 lg:py-20 flex flex-col gap-y-10 lg:gap-y-[60px]">
            <h1 className="text-2xl font-semibold text-white lg:text-4xl">Категории</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-[30px]">
                {nftCategoriesEnum.enumValues.map((item, index) => (
                    <CategoryCard key={index} item={item}/>
                ))}
            </div>
        </section>
    )
}