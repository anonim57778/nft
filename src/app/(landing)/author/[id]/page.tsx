import { api } from "~/trpc/server";
import S3Image from "~/components/ui/image";
import Link from "next/link";
import DiscordIcon from "~/components/icons/discord";
import YoutubeIcon from "~/components/icons/youtube";
import TwitterIcon from "~/components/icons/twitter";
import InstagramIcon from "~/components/icons/instagram";
import AuthorList from "./list";

export default async function AuthorPage({
    params
} : {
    params: Promise<{
        id: string;
    }>
}) {

    const param = (await params).id;

    const author = await api.user.getById({
        id: param
    })

    const arts = await api.art.getAll({
        ownerId: param
    })

    const collections = await api.collection.getAll({
        ownerId: param
    })


    return (
        <div>
            <div className="container py-10 flex flex-col gap-y-10">
                <div className="flex justify-center lg:justify-start">
                    <S3Image
                        src={author.imageId}
                        width={1080}
                        height={1920}
                        alt="author"
                        className="object-cover size-32 rounded-[20px] overflow-hidden"
                    />
                </div>

                <div className="flex flex-col gap-y-8">
                    <h1 className="text-5xl font-semibold text-center lg:text-left">{author.name}</h1>

                    <div className="flex gap-5 justify-center lg:justify-start">
                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-3xl font-bold text-center">{author.balance}</h1>

                            <h1 className="text-2xl font-normal">Баланс</h1>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <h1 className="text-3xl font-bold text-center">{author.sold}</h1>

                            <h1 className="text-2xl font-normal">Продаж</h1>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-3 text-center lg:text-left">
                        <h1 className="text-[#858584] text-2xl font-bold">Ссылки на соц.сеть</h1>

                        <div className="flex gap-3 justify-center lg:justify-start">
                            <Link
                                href={"#"}
                            >
                                <DiscordIcon className="size-8"/>
                            </Link>

                            <Link
                                href={"#"}
                            >
                                <YoutubeIcon className="size-8"/>
                            </Link>

                            <Link
                                href={"#"}
                            >
                                <TwitterIcon className="size-8"/>
                            </Link>

                            <Link
                                href={"#"}
                            >
                                <InstagramIcon className="size-8"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <AuthorList arts={arts} collections={collections}/>
        </div>
    )
}