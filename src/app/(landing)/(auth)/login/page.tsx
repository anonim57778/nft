"use client";

import { useForm } from "react-hook-form";
import { LoginSchema } from "~/lib/shared/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Form, FormField, FormItem } from "~/components/ui/form";
import { OnError } from "~/lib/client/on-error";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function LoginPage() {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {} as z.infer<typeof LoginSchema>
    })

    async function onSubmit(data: z.infer<typeof LoginSchema>) {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                ...data
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            router.push("/");
        } catch (error) {
            console.error(error);
            toast.error("Ошибка авторизации");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-10 w-full">
                <div className="flex flex-col gap-y-5 text-white">
                    <h1 className="text-4xl font-semibold">Вход</h1>
                </div>

                <div className="flex flex-col gap-y-[30px] w-full lg:w-[450px]">
                    <div className="flex flex-col gap-y-4">
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
                    </div>

                    <div className="flex flex-col gap-y-3">
                        <Button
                            type="submit"
                            size={"full"}
                        >
                            Войти
                        </Button>

                        <Link href={"/register"}>
                            <Button
                                size={"full"}
                            >
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    )
}