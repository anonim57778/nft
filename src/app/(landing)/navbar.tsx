"use client";
import Link from "next/link";
import { MenuIcon, StoreIcon, User2Icon, UserCircle2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { type Session } from "next-auth";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "~/components/ui/sheet";
import { api } from "~/trpc/react";
import CreateArt from "./create-art";
import CreateCollection from "./create-collection";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

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
                    <h2 className="text-white text-xl font-bold">ArtDigit</h2>
                </Link>

                <div className="hidden lg:flex items-center gap-[10px]">
                    {navbar.map((item, index) => (
                        <NavbarItem key={index} {...item}/>
                    ))}

                    {session?.session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <UserCircle2 className="size-10 text-white cursor-pointer duration-300 hover:text-primary"/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="flex flex-col bg-black/50 gap-y-1 mr-3">
                                <Link href="/profile">
                                    <Button className="flex items-center gap-3 lg:w-full h-10 bg-black/20">
                                        <User2Icon className="size-5"/>
                                        Профиль
                                    </Button>
                                </Link>

                                <CreateArt className="lg:w-full h-10 bg-black/20">
                                    <Button>
                                        Создать арт
                                    </Button>
                                </CreateArt>

                                <CreateCollection className="lg:w-full h-10 bg-black/20">
                                    <Button>
                                        Создать коллекцию
                                    </Button>
                                </CreateCollection>
                            </DropdownMenuContent>
                        </DropdownMenu>
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