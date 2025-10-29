import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import { PaymentSchema } from "~/lib/shared/types/payment";
import { arts, users } from "~/server/db/schema";

export const paymentRouter = createTRPCRouter({
    create: protectedProcedure
    .input(PaymentSchema)
    .mutation(async ({ ctx, input }) => {
        const existArt = await ctx.db.query.arts.findFirst({
            where: eq(arts.id, input.artId),
        });

        const ownerDb = await ctx.db.query.users.findFirst({
            where: eq(users.id, input.ownerId),
        });

        if (!existArt || !ownerDb) {
            throw new Error("Не удалось найти арт или владельца арта");
        }

        await ctx.db.update(arts).set({
            ownerId: ctx.session.user.id,
        }).where(eq(arts.id, existArt.id));

        await ctx.db.update(users).set({
            sold: ownerDb.sold + 1,
        }).where(eq(users.id, ownerDb.id));

        return await ctx.yookassa.createPayment({
                amount: input.price,
                redirectPath: `/`,
                userId: ctx.session.user.id,
            });
        }),
})