"use client";
import Link from "next/link";
import { MenuIcon, StoreIcon, User2Icon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { type Session } from "next-auth";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "~/components/ui/sheet";
import { api } from "~/trpc/react";
import CreateArt from "./create-art";
import CreateCollection from "./create-collection";

type Navbar = {
    name: string;
    url: string;
}

const navbar: Navbar[] = [
    {
        name: "Маркетплейс",
        url: "/marketplace"
    },
    {
        name: "Рейтинг",
        url: "/rating"
    },
]

function NavbarItem(item: Navbar) {

    return (
        <Link href={item.url} className="py-3 px-5 text-base text-white font-semibold duration-300 hover:text-primary">
            {item.name}
        </Link>
    )
}

function MobileNavbar({
    session
} : {
    session: Session
}) {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden">
                <MenuIcon className="size-6 text-primary"/>
            </SheetTrigger>
            <SheetContent className="flex gap-4 flex-col">
                <SheetHeader className="flex flex-row justify-between">
                    <Link href={"/"} className="text-2xl font-bold text-primary">Маркетплейс</Link>
                </SheetHeader>
                <div className="grow flex flex-col gap-6 items-center">
                    {navbar.map((item, index) => (
                        <NavbarItem key={index} {...item}/>
                    ))}
                </div>

                <SheetFooter>
                    {session ? (
                        <Link href="/logout">
                            <Button className="w-full">
                                Выход
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button className="w-full">
                                Вход
                            </Button>
                        </Link>
                    )}

                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}


export default function Navbar() {

    const {data: session} = api.user.session.useQuery();

    return (
        <header className="py-5">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <StoreIcon className="size-8 text-primary"/>
                    <h2 className="text-white text-xl font-bold">Маркетплейс цифоровго искусства</h2>
                </Link>

                <div className="hidden lg:flex items-center gap-[10px]">
                    {navbar.map((item, index) => (
                        <NavbarItem key={index} {...item}/>
                    ))}

                    {session?.session ? (
                        <div className="flex gap-2 items-center">
                            <Link href="/logout">
                                <Button>Выйти</Button>
                            </Link>

                            <CreateArt>
                                <Button>
                                    Создать
                                </Button>
                            </CreateArt>

                            <CreateCollection>
                                <Button>
                                    Создать коллекцию
                                </Button>
                            </CreateCollection>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button className="flex items-center gap-3">
                                <User2Icon className="size-5"/>
                                Войти
                            </Button>
                        </Link>
                    )}
                </div>

                {session?.session ? (
                    <MobileNavbar session={session?.session}/>
                ) : (
                    null
                )}
            </div>
        </header>
    )
}