"use client";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import S3Image from "~/components/ui/image";
import { images } from "~/lib/shared/types/images";
import Image from "next/image";

export default function CollectionImages({
    imagesData
} : {
    imagesData: string[]
}) {
    const [currentImage, setCurrentImage] = useState(0);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <S3Image
                    src={imagesData[currentImage] ?? images[currentImage] ?? ""}
                    alt="product"
                    className="rounded-2xl aspect-video object-cover overflow-hidden"
                    width={1080}
                    height={1920}
                />

                <div className="hidden gap-2 lg:grid lg:grid-cols-8">
                    {imagesData.length > 0 ? (
                        imagesData.map((image, index) => (
                            <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("px-0 overflow-hidden border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-white")}>
                                <S3Image
                                    src={image}
                                    alt="product image"
                                    className="size-16 object-contain"
                                    width={1080}
                                    height={1920}
                                />
                            </Button>
                        ))
                    ) : (
                        images.map((image, index) => (
                            <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("px-0 overflow-hidden border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-white")}>
                                <Image
                                    src={image}
                                    alt="product image"
                                    className="size-16 object-cover"
                                    width={1080}
                                    height={1920}
                                />
                            </Button>
                        ))
                    )}
                </div>
            </div>

            <div className="lg:hidden grid grid-cols-5 gap-2">
                {imagesData.length > 0 ? (
                    imagesData.map((image, index) => (
                        <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("px-0 overflow-hidden border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-white")}>
                            <S3Image
                                src={image}
                                alt="product image"
                                className="size-16 object-contain"
                                width={1080}
                                height={1920}
                            />
                        </Button>
                    ))
                ) : (
                    images.map((image, index) => (
                        <Button key={index} variant={"ghost"} onClick={() => setCurrentImage(index)} className={cn("px-0 overflow-hidden border rounded-[4px] h-auto bg-background", currentImage === index ? "border-primary" : "border-white")}>
                            <Image
                                src={image}
                                alt="product image"
                                className="size-16 object-cover"
                                width={1080}
                                height={1920}
                            />
                        </Button>
                    ))
                )}
            </div>
        </div>
    )
}