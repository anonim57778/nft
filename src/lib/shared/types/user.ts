import { z } from "zod";
import { EditFileSchema } from "./file";


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
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

export const LoginSchema = z.object({
    email: z.string({
        message: "Введите email",
    }).min(1, "Email обязательно").max(255, "Email слишком длинное").email("Введите правильный email"),
    password: z.string({
        message: "Введите пароль",
    }).min(1, "Пароль обязателен").max(255, "Пароль слишком длинный"),
})