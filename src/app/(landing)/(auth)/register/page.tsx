"use client";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "~/lib/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "~/trpc/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormField, FormItem } from "~/components/ui/form";
import { OnError } from "~/lib/client/on-error";
import { Input } from "~/components/ui/input";
import { ConvertFiles } from "~/lib/client/file";
import S3Image from "~/components/ui/image";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";

export default function Register() {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {} as z.infer<typeof RegisterSchema>
    })

    const registerMutation = api.user.register.useMutation({
        onSuccess: async (data) => {
            const res = await signIn("credentials", {
                redirect: false,
                ...data,
            })

            if(res?.error) {
                throw new Error(res.error)
            }

            router.push("/")
        },
        onError: (error) => {
            toast.error("Ошибка регистрации", {
                description: error.message,
            })
        }
    })

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        registerMutation.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-10">
                <div className="flex flex-col gap-y-5 text-white">
                    <h1 className="text-4xl font-semibold">Регистрация</h1>

                    <p>Добро пожаловать! Пожалуйста,<br className="hidden lg:block"/> введите свои данные для регистрации.</p>
                </div>

                <div className="flex flex-col gap-y-[30px] w-full lg:w-[450px]">
                    <div className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name={"image"}
                            render={({ field }) => (
                                <FormItem className="flex gap-4">
                                    <label className="w-full">
                                        <div className="w-full h-52 rounded-2xl overflow-hidden hover:scale-105 transition cursor-pointer">
                                            {field.value?.b64 ? (
                                                <img
                                                    src={field.value.b64}
                                                    alt="Изображение"
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <>
                                                    {field.value?.id ? (
                                                        <S3Image
                                                            src={field.value.id}
                                                            width={1080}
                                                            height={1920}
                                                            alt="Изображение"
                                                            className="size-full object-cover"
                                                        />
                                                    ) : (
                                                        <Skeleton className="size-full bg-muted" />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <Input
                                            type="file"
                                            className="hidden"
                                            accept="image/png, image/jpeg, image/webp"
                                            onChange={async (e) => {
                                                if (!e.target.files?.[0]) return;
                                                field.onChange(
                                                    (await ConvertFiles([e.target.files[0]]))[0]!,
                                                );
                                            }}
                                        />
                                    </label>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render= {({ field}) => (
                                <FormItem>
                                    <Input {...field} placeholder="Имя" />
                                </FormItem> 
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render= {({ field}) => (
                                <FormItem>
                                    <Input {...field} placeholder="Email" />
                                </FormItem> 
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render= {({ field}) => (
                                <FormItem>
                                    <Input {...field} placeholder="Пароль" />
                                </FormItem> 
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render= {({ field}) => (
                                <FormItem>
                                    <Input {...field} placeholder="Подтвердите пароль" />
                                </FormItem> 
                            )}
                        />
                    </div>

                    <Button
                        disabled={registerMutation.isPending}
                        size={"full"}
                    >
                        Создать аккаунт
                    </Button>
                </div>
            </form>
        </Form>
    )
}