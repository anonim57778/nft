import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import { PaymentSchema } from "~/lib/shared/types/payment";
import { arts } from "~/server/db/schema";

export const paymentRouter = createTRPCRouter({
    create: protectedProcedure
    .input(PaymentSchema)
    .mutation(async ({ ctx, input }) => {
        const existArt = await ctx.db.query.arts.findFirst({
            where: eq(arts.id, input.artId),
        });

        if (!existArt) {
            throw new Error("Не удалось найти арт");
        }

        await ctx.db.update(arts).set({
            ownerId: ctx.session.user.id,
        }).where(eq(arts.id, existArt.id));

        return await ctx.yookassa.createPayment({
                amount: input.price,
                redirectPath: `/`,
                userId: ctx.session.user.id,
            });
        }),
})