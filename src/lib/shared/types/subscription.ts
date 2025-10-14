import { z } from "zod";


export const SubscriptionSchema = z.object({
    email: z.string({
        message: "Неверный формат email"
    }).min(1, "Email обязательно").max(255, "Email слишком длинное").email("Введите правильный email"),
})