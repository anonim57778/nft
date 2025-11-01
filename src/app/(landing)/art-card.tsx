import Image from "next/image";
import Link from "next/link";
import S3Image from "~/components/ui/image";
import { type Art } from "~/lib/shared/types/art";
import { images } from "~/lib/shared/types/images";
import { cn } from "~/lib/utils";
import monkey from "../../../public/images/monkey.png"


export default function CardArt({
    item,
    className,
    index
} : {
    item: Art,
    className?: string,
    index: number
}) {

    return (
        <Link href={`/art/${item.id}`} className="rounded-[20px] overflow-hidden">
            {item.imageId ? (
                <S3Image
                    src={item.imageId}
                    width={1080}
                    height={1920}
                    alt="nft"
                    className="object-cover aspect-square w-full"
                />
            ) : (
                <Image
                    src={images[index] ?? monkey}
                    alt="art"
                    width={1080}
                    height={1920}
                    className="object-cover aspect-square w-full"
                />
            )}

            <div className={cn("py-6 px-8 space-y-6 text-white", className)}>
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">{item.name}</h1>

                    <div className="flex gap-3 items-center">
                        {item.owner.imageId ? (
                            <S3Image
                                src={item.owner.imageId}
                                width={24}
                                height={24}
                                alt="owner"
                                className="rounded-full size-6 overflow-hidden"
                            />
                        ) : (
                            <Image
                                src={monkey}
                                alt="owner"
                                width={24}
                                height={24}
                                className="rounded-full size-6 overflow-hidden"
                            />
                        )}

                        <h1 className="text-base font-normal">{item.owner.name}</h1>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-secondary text-xs font-normal">Цена</h1>

                        <h1 className="text-base font-normal">{item.price} руб</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}