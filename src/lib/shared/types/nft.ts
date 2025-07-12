import { z } from "zod";
import { EditFileSchema } from "./file";
import { NftCategorySchema } from "~/server/db/schema";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "~/server/api/root";


export const NftSchema = z.object({
    name: z.string({
        message: "Введите название",
    }).min(1, "Название обязательно").max(255, "Название слишком длинное"),
    description: z.string({
        message: "Введите описание",
    }).min(1, "Описание обязательно").max(255, "Описание слишком длинное"),
    image: EditFileSchema,
    categories: z.array(NftCategorySchema).min(1, "Выберите категорию"),
    price: z.coerce.number().min(1, "Цена должна быть больше или равна 1"),
})

export type Nft = inferProcedureOutput<AppRouter["nft"]["getAll"]>[number];