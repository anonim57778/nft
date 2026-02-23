import { getServerAuthSession } from "~/server/auth";
import UpdateProdile from "./update-profile";


export default async function ProfilePage() {

    const session = await getServerAuthSession();

    return (
        <div className="px-6 pt-6 h-full pb-20 lg:pb-6">
            <UpdateProdile session={session!}/>
        </div>
    )
}