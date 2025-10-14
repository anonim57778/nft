import { CollectionSchema } from "~/lib/shared/types/collection";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createCaller } from "../root";
import { collections, ArtCategorySchema } from "~/server/db/schema";
import { IdSchema } from "~/lib/shared/types/utils";
import { and, arrayContains, eq, ilike } from "drizzle-orm";
import { z } from "zod";


export const collectionRouter = createTRPCRouter({
    create: protectedProcedure
        .input(CollectionSchema)
        .mutation(async ({ ctx, input }) => {
            const imageIds: string[] = [];

            if (input.images) {
                const caller = createCaller(ctx);
                await Promise.all(input.images.map(async (image) => {
                    const id = await caller.file.create({
                        ...image,
                        b64: image.b64!,
                    })

                    imageIds.push(id.id);
                }))
            }

            await ctx.db.insert(collections).values({
                ...input,
                imageIds: imageIds,
                ownerId: ctx.session.user.id,
            })
        }),
    update: protectedProcedure
        .input(CollectionSchema.merge(IdSchema))
        .mutation(async ({ input, ctx }) => {
            const imageIds: string[] = [];

            if (input.images) {
                const caller = createCaller(ctx);
                await Promise.all(input.images.map(async (image) => {
                    const id = await caller.file.create({
                        ...image,
                        b64: image.b64!,
                    })

                    imageIds.push(id.id);
                }))
            }

            await ctx.db.update(collections).set({
                ...input,
                imageIds: imageIds,
            }).where(eq(collections.id, input.id));
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ input, ctx }) => {
            const collectionDb = await ctx.db.query.collections.findFirst({
                where: eq(collections.id, input.id),
            })

            if (!collectionDb) {
                throw new Error("Коллекция не найдена");
            }

            await ctx.db.delete(collections).where(eq(collections.id, collectionDb.id));
        }),
    getAll: publicProcedure
        .input(z.object({
            ownerId: IdSchema.optional(),
            search: z.string().optional(),
            category: ArtCategorySchema.optional()
        }))
        .mutation(async ({ ctx, input }) => {
            return await ctx.db.query.collections.findMany({
                where: and(
                    input.ownerId ? eq(collections.ownerId, input.ownerId.id) : undefined,
                    input.search ? ilike(collections.name, `%${input.search}%`) : undefined,
                    input.category ? arrayContains(collections.categories, [input.category]) : undefined,
                ),
                with: {
                    owner: true,
                },
            });
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ ctx, input }) => {
            const collectionDb = await ctx.db.query.collections.findFirst({
                where: eq(collections.id, input.id),
            })

            if (!collectionDb) {
                throw new Error("Коллекция не найдена");
            }

            return collectionDb;
        }),
})