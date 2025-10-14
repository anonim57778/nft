import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Rocket } from "lucide-react";
import Image from "next/image";
import space from "../../../public/images/space.svg";
import artist from "../../../public/images/artist.svg";

type Advantage = {
    title: string;
    text: string;
}

const advantages: Advantage[] = [
    {
        title: "240k+",
        text: "Продаж"
    },
    {
        title: "100k+",
        text: "Аукционов"
    },
    {
        title: "240k+",
        text: "Артистов"
    }
]

function AdvantageItem(item: Advantage) {

    return (
        <div className="text-white">
            <h2 className="text-xl lg:text-3xl font-bold">{item.title}</h2>
            <h1 className="text-base lg:text-2xl font-normal">{item.text}</h1>
        </div>
    )
}

export default function HeroSection() {

    return (
        <section className="py-10 lg:py-20">
            <div className="container grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-y-[30px] text-white">

                    <div className="flex flex-col gap-y-5">
                        <h1 className="text-3xl lg:text-7xl font-semibold">Открой<br className="hidden lg:block"/> цифровое искусство</h1>

                        <p className="text-base lg:text-xl font-normal">Стильный<br className="hidden lg:block"/> и удобный сервис<br className="hidden lg:block"/> с более 20к артистами.</p>
                    </div>

                    <Link href="/login" className="w-fit">
                        <Button className="flex items-center gap-3">
                            <Rocket className="size-5"/>
                            Начать
                        </Button>
                    </Link>

                    <div className="grid grid-cols-3 gap-[30px]">
                        {advantages.map((item, index) => (
                            <AdvantageItem key={index} {...item}/>
                        ))}
                    </div>
                </div>

                <div className=" rounded-[20px] overflow-hidden">
                    <Image
                        src={space as string}
                        alt="space"
                        width={1920}
                        height={1080}
                        className="object-cover aspect-[16/10]"
                    />

                    <div className="bg-card flex flex-col gap-y-[10px] py-[22px] text-white px-5 rounded-b-[20px]">
                        <h1 className="text-xl font-semibold">Космонавт идет</h1>

                        <div className="flex items-center gap-3">
                            <Image
                                src={artist as string}
                                alt="artist"
                                width={24}
                                height={24}
                                className="rounded-full size-6"
                            />

                            <h1 className="text-base font-normal">Анимакид</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}