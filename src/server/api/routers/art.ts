import { ArtSchema } from "~/lib/shared/types/art";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createCaller } from "../root";
import { ArtCategorySchema, arts } from "~/server/db/schema";
import { IdSchema } from "~/lib/shared/types/utils";
import { and, arrayContains, eq, ilike } from "drizzle-orm";
import { z } from "zod";


export const artRouter = createTRPCRouter({
    create: protectedProcedure
        .input(ArtSchema)
        .mutation(async ({ input, ctx }) => {
            let imageId = "";
            const caller = createCaller(ctx);

            if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
            }

            await ctx.db.insert(arts).values({
                ...input,
                imageId: imageId,
                ownerId: ctx.session.user.id,
            })
        }),
    update: protectedProcedure
        .input(ArtSchema.merge(IdSchema))
        .mutation(async ({ input, ctx }) => {
            let imageId = "";
            const caller = createCaller(ctx);
            const artDb = await ctx.db.query.arts.findFirst({
                where: eq(arts.id, input.id),
            })

            if (!artDb) {
                throw new Error("Не найден nft");
            }

            if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
            }

            await ctx.db.update(arts).set({
                ...input,
                imageId: imageId,
            }).where(eq(arts.id, artDb.id));
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ input, ctx }) => {
            const artDb = await ctx.db.query.arts.findFirst({
                where: eq(arts.id, input.id),
            })

            if (!artDb) {
                throw new Error("Не найден nft");
            }

            await ctx.db.delete(arts).where(eq(arts.id, artDb.id));
        }),
    getAll: publicProcedure
        .input(z.object({ 
            category: ArtCategorySchema.optional(),
            ownerId: z.string().optional(),
            search: z.string().optional(),
        }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.arts.findMany({
                where: and(
                    input.category ? arrayContains(arts.categories, [input.category]) : undefined,
                    input.ownerId ? eq(arts.ownerId, input.ownerId) : undefined,
                    input.search ? ilike(arts.name, `%${input.search}%`) : undefined,
                ),
                with: {
                    owner: true,
                }
            });
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ ctx, input }) => {
            const artDb = await ctx.db.query.arts.findFirst({
                where: eq(arts.id, input.id),
                with: {
                    owner: true
                }
            })

            if (!artDb) {
                throw new Error("Не найден nft");
            }

            return artDb;
        }),
    getMain: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.query.arts.findMany({
                with: {
                    owner: true,
                },
                limit: 3,
            });
        }),
})