import Link from "next/link";
import DiscordIcon from "~/components/icons/discord";
import InstagramIcon from "~/components/icons/instagram";
import TwitterIcon from "~/components/icons/twitter";
import YoutubeIcon from "~/components/icons/youtube";


type FooterSoc = {
    icon: React.ReactNode;
    url: string;
}

type FooterMenu = {
    name: string;
    url: string;
}

const footerSoc: FooterSoc[] = [
    {
        icon: <DiscordIcon/>,
        url: "#"
    },
    {
        icon: <YoutubeIcon/>,
        url: "#"
    },
    {
        icon: <TwitterIcon/>,
        url: "#"
    },
    {
        icon: <InstagramIcon/>,
        url: "#"
    }
]

const footerMenu: FooterMenu[] = [
    {
        name: "Маркетплейс",
        url: "/marketplace"
    },
    {
        name: "Рейтинг",
        url: "/rating"
    }
]


export default function Footer() {

    return (
        <footer className="py-10 bg-card border-t-2 border-t-background">
            <div className="container flex flex-col gap-y-5">
                <div className="grid grid-cols-1 gap-[30px] pb-[30px] border-b border-b-muted lg:grid-cols-3">
                    <div className="flex flex-col gap-y-[30px]">
                        <Link href="/" className="flex items-center gap-3">
                            <h2 className="text-white text-xl font-bold">ArtDigit</h2>
                        </Link>

                        <div className="flex flex-col gap-y-[30px]">
                            <p className="text-base text-muted font-normal">Маркетплейс цифрового искусства</p>

                            <div className="flex flex-col gap-y-4">
                                <p className="text-base text-muted font-normal">Присоединяйтесь к нашему сообществу</p>

                                <div className="flex gap-[10px]">
                                    {footerSoc.map((item, index) => (
                                        <Link href={item.url} key={index} className="w-fit">
                                            {item.icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-[30px]">
                        <h2 className="text-white text-xl font-bold">Меню</h2>

                        <div className="flex flex-col gap-y-5">
                            {footerMenu.map((item, index) => (
                                <Link href={item.url} key={index} className="text-base text-muted font-normal w-fit">
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-7">
                        <h2 className="text-white text-xl font-bold">Подписаться</h2>
                    </div>
                </div>

                <p className="text-xs text-muted font-normal">Ⓒ ArtDigit</p>
            </div>
        </footer>
    )
}