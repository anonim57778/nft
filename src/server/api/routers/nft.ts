import { NftSchema } from "~/lib/shared/types/nft";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { createCaller } from "../root";
import { NftCategorySchema, nfts } from "~/server/db/schema";
import { IdSchema } from "~/lib/shared/types/utils";
import { and, arrayContains, eq, ilike } from "drizzle-orm";
import { z } from "zod";


export const nftRouter = createTRPCRouter({
    create: protectedProcedure
        .input(NftSchema)
        .mutation(async ({ input, ctx }) => {
            let imageId: string = "";
            const caller = createCaller(ctx);

            if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
            }

            await ctx.db.insert(nfts).values({
                ...input,
                imageId: imageId,
                ownerId: ctx.session.user.id,
            })
        }),
    update: protectedProcedure
        .input(NftSchema.merge(IdSchema))
        .mutation(async ({ input, ctx }) => {
            let imageId: string = "";
            const caller = createCaller(ctx);
            const nftDb = await ctx.db.query.nfts.findFirst({
                where: eq(nfts.id, input.id),
            })

            if (!nftDb) {
                throw new Error("Не найден nft");
            }

            if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
            }

            await ctx.db.update(nfts).set({
                ...input,
                imageId: imageId,
            }).where(eq(nfts.id, nftDb.id));
        }),
    delete: protectedProcedure
        .input(IdSchema)
        .mutation(async ({ input, ctx }) => {
            const nftDb = await ctx.db.query.nfts.findFirst({
                where: eq(nfts.id, input.id),
            })

            if (!nftDb) {
                throw new Error("Не найден nft");
            }

            await ctx.db.delete(nfts).where(eq(nfts.id, nftDb.id));
        }),
    getAll: publicProcedure
        .input(z.object({ 
            category: NftCategorySchema.optional(),
            ownerId: IdSchema.optional(),
            search: z.string().optional(),
        }))
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.nfts.findMany({
                where: and(
                    input.category ? arrayContains(nfts.categories, [input.category]) : undefined,
                    input.ownerId ? eq(nfts.ownerId, input.ownerId.id) : undefined,
                    input.search ? ilike(nfts.name, `%${input.search}%`) : undefined,
                ),
                with: {
                    owner: true,
                }
            });
        }),
    getById: publicProcedure
        .input(IdSchema)
        .query(async ({ ctx, input }) => {
            const nftDb = await ctx.db.query.nfts.findFirst({
                where: eq(nfts.id, input.id),
            })

            if (!nftDb) {
                throw new Error("Не найден nft");
            }

            return nftDb;
        }),
    getMain: publicProcedure
        .query(async ({ ctx }) => {
            return await ctx.db.query.nfts.findMany({
                with: {
                    owner: true,
                },
                limit: 3,
            });
        }),
})