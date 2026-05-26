"use client";

import { HeartIcon } from "lucide-react";
import { toast } from "sonner";
import { type ItemType } from "~/server/db/schema";
import { api } from "~/trpc/react";

export default function AddFavorite({
    itemId,
    type
} : {
    itemId: string,
    type: ItemType
}) {

    const {data: favorites} = api.user.getFavorites.useQuery();
    const utils = api.useUtils();

    const favoriteFiltered = favorites?.filter((item) => item.itemId === itemId);

    const createMutation = api.user.addFavorite.useMutation({
        onSuccess: async (data) => {
            toast.success(
                data ? "Искусство добавлено" : "Искусство убрано из избранного",
                {
                    description: "Вы можете найти его на странице профиля",
                }
            );

            await utils.user.getFavorites.invalidate();
        },
        onError: (error) => {
            toast.error("Ошибка добавления искусства в избранное");
        }
    });

    const onSubmit = () => {
        createMutation.mutate({id: itemId, type: type});
    }

    return (
        <div onClick={onSubmit} className="size-9 absolute top-3 right-3 z-20 cursor-pointer bg-black/50 rounded-full flex justify-center items-center transition-all hover:size-11">
            <HeartIcon
                className={
                    (favoriteFiltered?.length ?? 0) > 0
                    ? "text-red-500 size-[80%]"
                    : "text-white size-[80%]"
                }
            />
        </div>
    )
}