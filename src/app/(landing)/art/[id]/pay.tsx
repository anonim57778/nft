"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Art } from "~/lib/shared/types/art";
import { api } from "~/trpc/react";


export default function PayButton({
    art
} : {
    art: Art
}) {

    const router = useRouter();
    const {data: session} = api.user.session.useQuery();

    const paymentMutation = api.payment.create.useMutation({
      onSuccess: (url) => {
        router.push(url);
      },
      onError: (error) => {
        console.error("Ошибка при создании платежа:", error);
      },
    });

    const submit = () => {
        paymentMutation.mutate({
            artId: art.id,
            ownerId: art.owner.id,
            price: art.price,
        });
    }

    return (
        session?.session && session.session.user.id != art.owner.id && (
            <Button onClick={submit} variant={"secondary"}>
                Купить
            </Button>
        )
    )
}