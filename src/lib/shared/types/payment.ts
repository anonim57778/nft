import { z } from "zod";


export const PaymentSchema = z.object({
    artId: z.string(),
    ownerId: z.string(),
    price: z.coerce.number(),
})