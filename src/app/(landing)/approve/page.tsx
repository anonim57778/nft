import { getServerAuthSession } from "~/server/auth";

import { api } from "~/trpc/server";
import ListArtsCollectionsIsPublished from "./not-publish-list";


export default async function ArtsCollectionsIsPublishedPage() {

    const session = await getServerAuthSession();

    const arts = await api.art.getIsPublished();

    const collections = await api.collection.getIsPublished();

    return (
        <div className="px-6 pt-6 min-h-screen pb-20 lg:pb-6">
            <ListArtsCollectionsIsPublished arts={arts} collections={collections}/>
        </div>
    )
}