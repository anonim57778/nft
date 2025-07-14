"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
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
import { CollectionSchema } from "~/lib/shared/types/collection";
import { nftCategoriesEnum } from "~/server/db/schema";
import { api } from "~/trpc/react";


export default function CreateCollection({
    children
} : {
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(CollectionSchema),
        defaultValues: {} as z.infer<typeof CollectionSchema>,
    })

    const createMutation = api.collection.create.useMutation({
        onSuccess: () => {
            toast.success("Коллекция создана");
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const onSubmit = (data: z.infer<typeof CollectionSchema>) => {
        createMutation.mutate(data);
    }

    const imagesArray = useFieldArray({
        control: form.control,
        name: "images",
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
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
											</label>

											<Button variant={"ghost"} className="flex justify-center items-center bg-white" size="full" onClick={() => imagesArray.remove(index)}>
												<Trash2 className="size-10 text-red-500"/>
											</Button>
										</FormItem>
									)}
								/>
							))}
							<Button
								type="button"
								// @ts-expect-error Ожидается ошибка из-за несовместимости типов
								onClick={() => imagesArray.append("")}
                                size={"full"}
							>
								Добавить
							</Button>
						</div>

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