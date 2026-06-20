"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { OnError } from "~/lib/client/on-error";
import { UpdateDataSchema } from "~/lib/shared/types/user";
import { api } from "~/trpc/react";


export default function UpdateProfile({
    session
} : {
    session: Session
}) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(UpdateDataSchema),
        defaultValues: {}
    })

    useEffect(() => {
        form.reset(session.user as unknown as z.infer<typeof UpdateDataSchema>)
    }, [session.user]);

    const updateUserMutation = api.user.update.useMutation({
        onSuccess: () => {
            toast.success("Профиль обновлен");
            router.refresh();
        },
        onError: (error) => {
            toast.error("Ошибка", {
                description: error.message,
            });
        },
    });

    const onSubmit = (data: z.infer<typeof UpdateDataSchema>) => {
        updateUserMutation.mutate(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-4 justify-between w-full h-full overflow-auto">
                <div className="flex flex-col">
                    <h1 className="text-base text-popover font-semibold border-b border-white pb-2">Личная информация</h1>

                    <div className="grow flex flex-col gap-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6 bg-background rounded-b-3xl">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white text-base font-medium">Имя</FormLabel>
                                        <FormControl>
                                            <Input className="rounded-md" {...field} placeholder="Ваше имя"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="age"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white text-base font-medium">Возраст</FormLabel>
                                        <FormControl>
                                            <Input className="rounded-md" {...field} placeholder="Возраст"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel className="text-white text-base font-medium">Любимый жанр</FormLabel>
                                        <FormControl>
                                            <Input className="rounded-md" {...field} placeholder="Жанр"/>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <h1 className="text-base text-popover font-semibold border-b border-white pb-2">Дополнительно</h1>

                            <div className="grid grid-cols-1 gap-6 p-6 bg-background rounded-b-3xl w-full">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white text-base font-medium">Описание</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} placeholder="Описание"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="urlMax"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-white text-base font-medium">Ссылка на ваш профиль в Макс</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="https://max.ru/user/profile"/>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                </div>

                <Button disabled={updateUserMutation.isPending} className="w-full lg:w-full bg-background hover:opacity-90 hover:border-none py-5 lg-py-0">Сохранить</Button>
            </form>
        </Form>
    )
}