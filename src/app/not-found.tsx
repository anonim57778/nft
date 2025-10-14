import Link from "next/link";
import { Button } from "~/components/ui/button";


export default function NotFound() {

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-y-5">
            <h2 className="font-medium text-9xl text-white">404</h2>

            <p className="text-center text-white">Похоже мы не нашли нужную страницу, <br className="hidden lg:block"/> пожалуйста, перейдите на главную страницу</p>
            <Link href={"/"}>
                <Button>
                    На главную
                </Button>
            </Link>
        </div>
    )
}