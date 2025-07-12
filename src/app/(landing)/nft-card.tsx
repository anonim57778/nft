import Link from "next/link";
import S3Image from "~/components/ui/image";
import { Nft } from "~/lib/shared/types/nft";
import { cn } from "~/lib/utils";


export default function CardNft({
    item,
    className
} : {
    item: Nft,
    className?: string
}) {

    return (
        <Link href={`/nft/${item.id}`} className="rounded-[20px] overflow-hidden">
            <S3Image
                src={item.imageId}
                width={1080}
                height={1920}
                alt="nft"
                className="object-cover aspect-square w-full"
            />

            <div className={cn("py-6 px-8 space-y-6 text-white", className)}>
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-semibold">{item.name}</h1>

                    <div className="flex gap-3 items-center">
                        <S3Image
                            src={item.owner.imageId}
                            width={24}
                            height={24}
                            alt="owner"
                            className="rounded-full size-6 overflow-hidden"
                        />

                        <h1 className="text-base font-normal">{item.owner.name}</h1>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h1 className="text-secondary text-xs font-normal">Цена</h1>

                        <h1 className="text-base font-normal">{item.price} ETH</h1>
                    </div>
                </div>
            </div>
        </Link>
    )
}