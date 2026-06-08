"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";
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
import { Art, ArtSchema } from "~/lib/shared/types/art";
import { artsCategoriesEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";


export default function MakePublishArt({
    className,
    art,
    index
} : {
    className?: string;
    art: Art;
    index: number;
}) {
    const [open, setOpen] = useState(false);

    function mapArtToForm(
        art?: Art
    ): z.infer<typeof ArtSchema> {
        return {
            name: art?.name ?? "",
            description: art?.description ?? "",
            categories: art?.categories ?? [],
            price: art?.price ?? 1,
            image: art?.imageId
            ? {
                id: art.imageId,
                }
            : undefined,
        };
    }

    const form = useForm({
        resolver: zodResolver(ArtSchema),
        defaultValues: mapArtToForm(art),
    })

    const makePublishMutation = api.art.makePublished.useMutation({
        onSuccess: () => {
            toast.success("Арт опубликован", {
                description: "Арт будет виден всем пользователям",
            });
            setOpen(false);
            form.reset();
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = (data: z.infer<typeof ArtSchema>) => {
        makePublishMutation.mutate({ ...data, id: art.id });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={className}>
                <div className="border border-card rounded-[20px] text-secondary text-xs lg:text-2xl font-normal py-3 px-5 flex items-center gap-4 cursor-pointer">
                    <h1>{index + 1}</h1>
                    <S3Image src={form.getValues("image")?.id ?? ""} width={100} height={100} alt="Изображение" className="rounded-full size-6"/>
                    <div className="flex gap-10">
                        <h1>{art.name ?? ""}</h1>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="overflow-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-5">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem className="flex gap-4">
                                    <div className="w-full disabled:only:read-only:cursor-not-allowed">
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
                                                        <Skeleton className="size-full bg-primary" />
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
                                    </div>
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
                                    <Input {...field} placeholder="Название" readOnly={true} />
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
                                    <Input {...field} placeholder="Описание" readOnly={true} />
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
                                    <Input {...field} placeholder="Цена" readOnly={true} />
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
                                            <Button className="text-start" size={"full"} disabled={true}>
                                                {field.value?.length ? field.value.join(", ") : "Выберите категории"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full">
                                            <div className="flex flex-col gap-2">
                                                {artsCategoriesEnum.enumValues.map((category) => (
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
                            disabled={makePublishMutation.isPending}
                            size={"full"}
                        >
                            Опубликовать
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}