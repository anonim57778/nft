import { z } from "zod";
import { EditFileSchema } from "./file";
import { ArtCategorySchema } from "~/server/db/schema";
import { type inferProcedureOutput } from "@trpc/server";
import { type AppRouter } from "~/server/api/root";


export const ArtSchema = z.object({
    name: z.string({
        message: "Введите название",
    }).min(1, "Название обязательно").max(255, "Название слишком длинное"),
    description: z.string({
        message: "Введите описание",
    }).min(1, "Описание обязательно").max(255, "Описание слишком длинное"),
    image: EditFileSchema.optional(),
    categories: z.array(ArtCategorySchema, {
        message: "Выберите категорию",
    }).min(1, "Выберите категорию"),
    price: z.coerce.number({
        message: "Цена должна быть больше или равна 1",
    }).min(1, "Цена должна быть больше или равна 1").positive("Цена должна быть положительной"),
})

export type Art = inferProcedureOutput<AppRouter["art"]["getAll"]>[number];