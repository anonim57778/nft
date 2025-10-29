import { format } from "date-fns";
import { ru } from "date-fns/locale";
import NotFound from "~/app/not-found";
import S3Image from "~/components/ui/image";
import { categoriesData } from "~/lib/shared/types/category";
import { api } from "~/trpc/server";
import ArtList from "./art-list";
import { CategoriesToString } from "~/lib/enums";
import { type ArtCategoryEnum } from "~/server/db/schema";
import PayButton from "./pay";


export default async function ArtPage({
    params
} : {
    params: Promise<{
        id: string;
    }>
}) {
    const param = (await params).id;

    const art = await api.art.getById({
        id: param
    });

    if (!art) {
        return (
            <NotFound/>
        )
    }

    return (
        <div>
            <S3Image
                src={art.imageId}
                width={1080}
                height={1920}
                alt="nft"
                className="object-cover h-[350px] lg:h-[500px] w-full"
            />

            <div className="container py-10 flex justify-between items-start flex-col-reverse lg:flex-row">
                <div className="flex flex-col gap-y-[30px] w-full lg:w-[650px]">
                    <div className="flex flex-col gap-y-[10px]">
                        <h1 className="text-5xl font-semibold">{art.name}</h1>
                        <p className="text-2xl font-normal text-secondary">Создан {format(new Date(art.createdAt), "dd.MM.yyyy", {locale: ru})}</p>

                        <PayButton art={art}/>
                    </div>

                    <div className="flex flex-col gap-y-[10px]">
                        <h1 className="text-2xl font-bold text-secondary">Автор</h1>

                        <div className="flex items-center gap-3">
                            <S3Image
                                src={art.owner.imageId}
                                width={24}
                                height={24}
                                alt="owner"
                                className="rounded-full object-cover size-6 overflow-hidden"
                            />

                            <h1 className="text-2xl font-semibold">{art.owner.name}</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[10px]">
                        <h1 className="text-2xl font-bold text-secondary">Описание</h1>

                        <p className="text-2xl font-normal">{art.description} fhsfhevhchefhefvrvhe frhefrhfhefh dfh hfehf e hehf e hfr h fhhf e he he hfehfehf ehfeh feh hf eh fehf hdf hf hdv h</p>
                    </div>

                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-2xl font-bold text-secondary">Категории</h1>

                        <div className="flex gap-5 flex-wrap">
                            {art.categories?.map((category, index) => (
                                <div className="bg-card rounded-[20px] px-[30px] py-3" key={index}>
                                    {CategoriesToString(categoriesData[category]!.name as ArtCategoryEnum)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ArtList ownerId={art.owner.id}/>
        </div>
    )
}