"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Collection, CollectionSchema } from "~/lib/shared/types/collection";
import { artsCategoriesEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";


export default function MakePublishCollection({
    className,
    collection,
    index
} : {
    className?: string;
    collection: Collection;
    index: number;
}) {
    const [open, setOpen] = useState(false);


    function mapCollectionToForm(
        collection?: Collection
    ): z.infer<typeof CollectionSchema> {
        return {
            name: collection?.name ?? "",
            description: collection?.description ?? "",
            categories: collection?.categories ?? [],
            price: collection?.price ?? 1,
            images: collection?.imageIds
                ? collection.imageIds.map((id) => ({
                    id,
                }))
                : [],
        };
    }

    const form = useForm({
        resolver: zodResolver(CollectionSchema),
        defaultValues: mapCollectionToForm(collection),
    })

    const makePublishMutation = api.collection.makePublished.useMutation({
        onSuccess: () => {
            toast.success("Коллекция опубликована", {
                description: "Коллекция будет видна всем пользователям",
            });
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const onSubmit = (data: z.infer<typeof CollectionSchema>) => {
        makePublishMutation.mutate({ ...data, id: collection.id });
    }

    const imagesArray = useFieldArray({
        control: form.control,
        name: "images",
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className={className}>
                <div className="border border-card rounded-[20px] text-secondary text-xs lg:text-2xl font-normal py-3 px-5 flex items-center gap-4 cursor-pointer">
                    <h1>{index + 1}</h1>
                    <S3Image src={imagesArray.fields[0]?.id ?? ""} width={100} height={100} alt="Изображение" className="rounded-full size-6"/>
                    <div className="flex gap-10">
                        <h1>{collection.name ?? ""}</h1>
                    </div>
                </div>
            </DialogTrigger>
            <DialogContent className="overflow-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, OnError)} className="flex flex-col gap-y-5">
						<div className="flex flex-col gap-4">
							{imagesArray.fields.map((image, index) => (
								<FormField
									key={index}
									control={form.control}
									name={`images.${index}`}
									render={({ field }) => (
										<FormItem className="flex flex-col gap-y-4">
											<div className="w-full">
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
							))}
						</div>

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