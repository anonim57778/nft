import Image from "next/image";
import astronaut from "../../../public/images/astronaut.svg";
import Subscription from "./subscription";

export default function SubscriptionSection() {

    return (
        <div className="py-10 lg:py-20 container">
            <div className="lg:p-[60px] rounded-[20px] flex justify-between lg:bg-card gap-[30px] items-center flex-col lg:flex-row">
                <Image
                    src={astronaut as string}
                    alt="astronaut"
                    width={1080}
                    height={1920}
                    className="object-cover"
                />

                <div className="flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-[10px]">
                        <h1 className="text-2xl lg:text-4xl font-semibold">Присоединиться на еженедельную рассылку</h1>

                        <p className="text-base font-normal lg:text-xl">Получайте новости и обновления по нашему сайту</p>
                    </div>

                    <Subscription/>
                </div>
            </div>
        </div>
    )
}