import { z } from "zod";
import { ArtCategorySchema } from "~/server/db/schema";
import { EditFileSchema } from "./file";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";


export const CollectionSchema = z.object({
    name: z.string({
        message: "Введите название",
    }).min(1, "Название обязательно").max(255, "Название слишком длинное"),
    description: z.string({
        message: "Введите описание",
    }).min(1, "Описание обязательно").max(255, "Описание слишком длинное"),
    images: z.array(EditFileSchema, {
        message: "Выберите минимум 5 изображений",
    }).min(5, "Выберите минимум 5 изображений"),
    categories: z.array(ArtCategorySchema, {
        message: "Выберите категорию",
    }).min(1, "Выберите категорию"),
    price: z.coerce.number({
        message: "Цена должна быть больше или равна 1",
    }).min(1, "Цена должна быть больше или равна 1").positive("Цена должна быть положительной"),
});

export type  Collection = inferProcedureOutput<AppRouter["collection"]["getAll"]>[number];