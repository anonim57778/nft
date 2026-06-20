import { z } from "zod";
import { EditFileSchema } from "./file";
import { ItemTypeSchema } from "~/server/db/schema";


export const RegisterSchema = z.object({
    name: z.string({
        message: "Введите имя",
    }).min(1, "Имя обязательно").max(255, "Имя слишком длинное"),
    email: z.string({
        message: "Введите email",
    }).min(1, "Email обязательно").max(255, "Email слишком длинное").email("Введите правильный email"),
    password: z.string({
        message: "Введите пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
    confirmPassword: z.string({
        message: "Подтвердите пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
    image: EditFileSchema.optional(),
    urlMax: z.string({
        message: "Введите ссылку на ваш профиль в Макс",
    }).min(1, "Ссылка на ваш профиль обязательна").max(255, "Ссылка на ваш профиль слишком длинная"),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
})
.refine((data) => data.urlMax.startsWith("https://max.ru"), "Ссылка на ваш профиль должна начинаться с https://max.ru");

export const LoginSchema = z.object({
    email: z.string({
        message: "Введите email",
    }).min(1, "Email обязательно").max(255, "Email слишком длинное").email("Введите правильный email"),
    password: z.string({
        message: "Введите пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
})

export const UpdateDataSchema = z.object({
    name: z.string({
        message: "Введите имя",
    }).min(1, "Имя обязательно").max(255, "Имя слишком длинное"),
    description: z.string({
        message: "Введите описание",
    }),
    genre: z.string({
        message: "Введите жанр",
    }),
    age: z.coerce.number({
        message: "Введите возраст",
    }).min(1, "Возраст обязателен").max(100, "Возраст слишком велик"),
    image: EditFileSchema.optional(),
    urlMax: z.string({
        message: "Введите ссылку на ваш профиль в Макс",
    }).min(1, "Ссылка на ваш профиль обязательна").max(255, "Ссылка на ваш профиль слишком длинная"),
})
.refine((data) => data.urlMax.startsWith("https://max.ru"), "Ссылка на ваш профиль должна начинаться с https://max.ru");

export const UpdatePasswordSchema = z.object({
    oldPassword: z.string({
        message: "Введите старый пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
    newPassword: z.string({
        message: "Введите новый пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
    confirmPassword: z.string({
        message: "Подтвердите пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
})

export const TypesSchema = z.object({
    type: ItemTypeSchema,
});