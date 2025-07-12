import setup from "../../../public/images/setup.svg";
import collection from "../../../public/images/collection.svg";
import cart from "../../../public/images/cart.svg";
import Image from "next/image";
import { ReactNode } from "react";

type About = {
    title: string;
    text: string;
    image: ReactNode
}

const about: About[] = [
    {
        title: "Настройте кошелек",
        text: "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
        image: <Image
            src={setup}
            alt="setup"
            width={1920}
            height={1080}
            className="size-56 lg:size-64 overflow-hidden"
        />
    },
    {
        title: "Создавайте коллекции",
        text: "Upload your work and setup your collection. Add a description, social links and floor price.",
        image: <Image
            src={collection}
            alt="collection"
            className="size-52 lg:size-64 overflow-hidden"
        />
    },
    {
        title: "Продавайте",
        text: "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
        image: <Image
            src={cart}
            alt="cart"
            className="size-56 lg:size-64 overflow-hidden"
        />
    }
]

function AboutItem(item: About) {
    return (
        <div className="rounded-[20px] bg-card p-[30px] flex flex-row lg:flex-col gap-5 items-center h-[150px] lg:h-[500px] overflow-hidden">
            {item.image}

            <div className="flex flex-col gap-y-[10px] text-left lg:text-center">
                <h1 className="text-base lg:text-2xl font-semibold">{item.title}</h1>

                <p className="text-xs lg:text-base font-normal">{item.text}</p>
            </div>
        </div>
    )
}

export default function AboutSection() {
    return (
        <section className="py-10 lg:py-20 container flex flex-col gap-y-10 lg:gap-y-[60px]">
            <h1 className="text-2xl font-semibold text-white lg:text-4xl">Как это работает?</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-[30px]">
                {about.map((item, index) => (
                    <AboutItem key={index} {...item}/>
                ))}
            </div>
        </section>
    )
}