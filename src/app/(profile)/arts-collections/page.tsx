import { getServerAuthSession } from "~/server/auth";
import ListArtsCollections from "./arts-collections-list";
import { api } from "~/trpc/server";


export default async function ArtsCollectionsPage() {

    const session = await getServerAuthSession();

    const arts = await api.art.getAll({
        ownerId: session!.user.id,
        isProfile: true,
    });

    const collections = await api.collection.getAll({
        ownerId: session!.user.id,
        isProfile: true,
    });

    return (
        <div className="px-6 pt-6 h-full pb-20 lg:pb-6">
            <ListArtsCollections arts={arts} collections={collections}/>
        </div>
    )
}