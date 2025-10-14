"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { OnError } from "~/lib/client/on-error";
import { SubscriptionSchema } from "~/lib/shared/types/subscription";
import { api } from "~/trpc/react";


export default function Subscription() {

    const form = useForm({
        resolver: zodResolver(SubscriptionSchema),
        defaultValues: {} as z.infer<typeof SubscriptionSchema>,
    });

    const createMutation = api.subscription.create.useMutation({
        onSuccess: () => {
            form.reset()
            toast.success("Подписка успешно оформлена")
        },
        onError: (error) => {
            toast.error(error.message, {
                description: "Ошибка при оформлении подписки"
            })
        }
    });

    const onSubmit = (data: z.infer<typeof SubscriptionSchema>) => {
        createMutation.mutate(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex overflow-hidden rounded-[20px] gap-y-4 flex-col lg:flex-row lg:gap-y-0 lg:bg-white">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <Input {...field} placeholder="Введите email" className="h-auto"/>
                    )}
                />

                <Button className="flex justify-center items-center border-primary">
                    <Mail className="size-5"/>
                    Подписаться
                </Button>
            </form>
        </Form>
    )
}