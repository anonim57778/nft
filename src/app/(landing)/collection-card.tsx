import Link from "next/link"
import S3Image from "~/components/ui/image"
import { Collection } from "~/lib/shared/types/collection"


export default function CardCollection({
    item
} : {
    item: Collection
}) {

    return (
        <Link href={`product/${item.id}/collection`} className="rounded-[20px] flex flex-col gap-y-4 text-white">
            <div className="h-[330px] rounded-[20px] overflow-hidden">
                <S3Image
                    src={item.imageIds?.[0] ?? ""}
                    width={1920}
                    height={1080}
                    alt="nft"
                    className="object-cover size-full"
                />
            </div>

            <div className="flex justify-between gap-3">
                <S3Image
                    src={item.imageIds?.[1] ?? ""}
                    height={1920}
                    width={1080}
                    alt="owner"
                    className="rounded-[20px] overflow-hidden object-cover size-[100px]"
                />

                <S3Image
                    src={item.imageIds?.[2] ?? ""}
                    height={1920}
                    width={1080}
                    alt="owner"
                    className="rounded-[20px] overflow-hidden object-cover size-[100px]"
                />

                <div className="rounded-[20px] size-[100px] bg-primary flex justify-center items-center">
                    <h1 className="text-2xl font-bold">{item.imageIds?.length! - 3}+</h1>
                </div>
            </div>

            <div className="flex flex-col gap-y-[10px]">
                <h1 className="text-2xl font-semibold">{item.name}</h1>

                <div className="flex items-center gap-3">
                    <S3Image
                        src={item.owner.imageId}
                        width={24}
                        height={24}
                        alt="owner"
                        className="rounded-full object-cover size-6 overflow-hidden"
                    />

                    <h1 className="text-base font-normal">{item.owner.name}</h1>
                </div>
            </div>
        </Link>
    )
}