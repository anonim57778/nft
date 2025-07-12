"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel } from "~/components/ui/form";
import S3Image from "~/components/ui/image";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Skeleton } from "~/components/ui/skeleton";
import { ConvertFiles } from "~/lib/client/file";
import { OnError } from "~/lib/client/on-error";
import { NftSchema } from "~/lib/shared/types/nft";
import { nftCategoriesEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";


export default function CreateNft({
    children
} : {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(NftSchema),
        defaultValues: {} as z.infer<typeof NftSchema>,
    })

    const createMutation = api.nft.create.useMutation({
        onSuccess: () => {
            toast.success("NFT создан", {
                description: "Вы можете продолжить редактировать nft в любой момент",
            });
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = (data: z.infer<typeof NftSchema>) => {
        createMutation.mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="overflow-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="image"
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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        Название
                                    </FormLabel>
                                    <Input {...field} placeholder="Название" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        Описание
                                    </FormLabel>
                                    <Input {...field} placeholder="Описание" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">
                                        Цена
                                    </FormLabel>
                                    <Input {...field} placeholder="Цена" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem className="flex justify-between flex-col">
                                    <FormLabel className="text-white">
                                        Категории
                                    </FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button className="text-start" size={"full"}>
                                                {field.value?.length ? field.value.join(", ") : "Выберите категории"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full">
                                            <div className="flex flex-col gap-2">
                                                {nftCategoriesEnum.enumValues.map((category) => (
                                                    <label key={category} className="flex items-center gap-2">
                                                        <Checkbox
                                                            checked={field.value?.includes(category)}
                                                            onCheckedChange={(checked) => {
                                                            const newValue = checked
                                                                ? [...(field.value || []), category]
                                                                : (field.value || []).filter((c) => c !== category);
                                                            field.onChange(newValue);
                                                            }}
                                                        />
                                                        {category}
                                                    </label>
                                                ))}
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={createMutation.isPending}
                            size={"full"}
                        >
                            Создать
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}