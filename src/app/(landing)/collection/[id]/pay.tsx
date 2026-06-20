"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Collection } from "~/lib/shared/types/collection";
import { api } from "~/trpc/react";


export default function PayButton({
    collection
} : {
    collection: Collection
}) {

    const router = useRouter();
    const {data: session} = api.user.session.useQuery();

    const paymentMutation = api.payment.createCollectionPayment.useMutation({
      onSuccess: (url) => {
        router.push(url);
      },
      onError: (error) => {
        console.error("Ошибка при создании платежа:", error);
      },
    });

    const submit = () => {
        paymentMutation.mutate({
            collectionId: collection.id,
            ownerId: collection.owner.id,
            price: collection.price,
        });
    }

    return (
        session?.session && session.session.user.id != collection.owner.id && (
            <Button onClick={submit} variant={"secondary"}>
                Купить
            </Button>
        )
    )
}