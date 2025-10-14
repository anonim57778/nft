import { SubscriptionSchema } from "~/lib/shared/types/subscription"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { eq } from "drizzle-orm"
import { subscriptions, users } from "~/server/db/schema"


export const subscriptionRouter = createTRPCRouter({
    create: publicProcedure
        .input(SubscriptionSchema)
        .mutation(async ({ input, ctx }) => {
            const userDb = await ctx.db.query.users.findFirst({
                where: eq(
                    users.email, input.email
                )
            })

            if (!userDb) {
                throw new Error("Пользователь не найден");
            }

            await ctx.db.insert(subscriptions).values({
                email: input.email
            })
        }),
})