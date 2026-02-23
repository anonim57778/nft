import { Art } from "~/lib/shared/types/art";
import ListFavorites from "./list-favorites";
import { api } from "~/trpc/server";
import { Collection } from "~/lib/shared/types/collection";


export default async function FavoritesPage() {

    const arts = await api.user.getAllFavorites({
        type: "ART"
    });

    const favoriteArts = arts
        .filter(
            (f): f is typeof f & { art: Art } =>
            f.type === "ART" && f.art !== null
        )
        .map(f => f.art);



    const collections = await api.user.getAllFavorites({
        type: "COLLECTION"
    });

    const favoriteCollections = collections
        .filter(
            (f): f is typeof f & { collection: Collection } =>
            f.type === "COLLECTION" && f.collection !== null
        )
        .map(f => f.collection);



    return (
        <div className="px-6 pt-6 h-full pb-20 lg:pb-6">
            <ListFavorites arts={favoriteArts} collections={favoriteCollections}/>
        </div>
    )
}