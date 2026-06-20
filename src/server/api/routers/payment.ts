import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import { eq } from "drizzle-orm";
import { PaymentCollectionSchema, PaymentSchema } from "~/lib/shared/types/payment";
import { arts, collections, users } from "~/server/db/schema";

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
            balance: ownerDb.balance + input.price,
        }).where(eq(users.id, ownerDb.id));

        return await ctx.yookassa.createPayment({
                amount: input.price,
                redirectPath: `/`,
                userId: ctx.session.user.id,
            });
        }),
    createCollectionPayment: protectedProcedure
        .input(PaymentCollectionSchema)
        .mutation(async ({ ctx, input }) => {
            const existCollection = await ctx.db.query.collections.findFirst({
                where: eq(collections.id, input.collectionId),
            });

            const ownerDb = await ctx.db.query.users.findFirst({
                where: eq(users.id, input.ownerId),
            });

            if (!existCollection || !ownerDb) {
                throw new Error("Не удалось найти коллекцию или владельца коллекции");
            }

            await ctx.db.update(collections).set({
                ownerId: ctx.session.user.id,
            }).where(eq(collections.id, existCollection.id));

            await ctx.db.update(users).set({
                sold: ownerDb.sold + 1,
                balance: ownerDb.balance + input.price,
            }).where(eq(users.id, ownerDb.id));

            return await ctx.yookassa.createPayment({
                amount: input.price,
                redirectPath: `/`,
                userId: ctx.session.user.id,
            });
        }),
})