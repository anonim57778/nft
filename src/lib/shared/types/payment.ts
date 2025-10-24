import { z } from "zod";


export const PaymentSchema = z.object({
    artId: z.string(),
    userId: z.string(),
    price: z.coerce.number(),
})