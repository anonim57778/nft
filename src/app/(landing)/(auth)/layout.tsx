import { getServerAuthSession } from "~/server/auth";
import authImage from "../../../../public/images/auth-image.svg";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    const session = await getServerAuthSession();

    if (session?.user) {
        return redirect("/");
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-11">
            <Image 
                src={authImage as string}
                alt="auth-image"
                className="object-cover aspect-square w-full"
            />

            <div className="flex items-center container pb-10">
                {children}
            </div>
        </div>
    )
}