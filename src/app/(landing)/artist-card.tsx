import S3Image from "~/components/ui/image"


export default function ArtistCard({
    variant = "default",
    index,
    name,
    imageId,
    sold,
} : {
    variant?: "default" | "ranking",
    index: number,
    name: string,
    imageId: string,
    sold: number
}) {

    switch (variant) {
        case "default":
            return (
                <div className="flex flex-row items-center gap-5 p-5 rounded-[20px] bg-card relative lg:flex-col">
                    <div className="size-[30px] rounded-full bg-background absolute z-30 top-3 left-3 lg:top-5 lg:left-5 flex justify-center items-center">
                        <h1 className="text-secondary text-base font-normal">{index}</h1>
                    </div>

                    <S3Image
                        src={imageId ?? ""}
                        alt={name ?? ""}
                        width={110}
                        height={110}
                        className="rounded-full size-[60px] lg:size-[110px] object-cover overflow-hidden"
                    />

                    <div className="flex flex-col gap-y-1 grow lg:w-full">
                        <h1 className="text-2xl font-semibold lg:text-center">{name}</h1>

                        <div className="flex justify-between items-center">
                            <h1 className="text-secondary text-base font-normal">Продаж:</h1>

                            <h1 className="text-base font-normal">{sold}</h1>
                        </div>
                    </div>
                </div>
            )
        case "ranking":
            return (
                <div className="bg-card rounded-[20px] py-3 px-5 flex justify-between lg:grid lg:grid-cols-2 gap-4 lg:gap-[60px]">
                    <div className="flex gap-4 items-center">
                        <div className="size-[30px] rounded-full bg-background flex justify-center items-center">
                            <h1 className="text-secondary text-base font-normal">{index}</h1>
                        </div>

                        <S3Image
                            src={imageId ?? ""}
                            alt={name ?? ""}
                            width={60}
                            height={60}
                            className="rounded-full size-6 lg:size-[60px] object-cover overflow-hidden"
                        />

                        <h1 className="text-base font-normal lg:text-2xl lg:font-semibold">{name}</h1>
                    </div>

                    <div className="flex items-center gap-5 grow">
                        <h1 className="text-base font-normal grow text-center">{sold}</h1>
                    </div>
                </div>
            )
    }
}