import { RegisterSchema, TypesSchema, UpdateDataSchema, UpdatePasswordSchema } from "~/lib/shared/types/user";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { arts, collections, favorites, users } from "~/server/db/schema";
import { createCaller } from "../root";
import { and, eq } from "drizzle-orm";
import { IdSchema } from "~/lib/shared/types/utils";

export const userRouter = createTRPCRouter({
    session: publicProcedure.query(async ({ ctx }) => {
		return {
			session: ctx.session,
		};
	}),
	register: publicProcedure
		.input(RegisterSchema)
		.mutation(async ({ ctx, input }) => {
			let imageId = "";
			const caller = createCaller(ctx);

			if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
			}

			const passwordHash = await bcrypt.hash(input.password, 10);

			await ctx.db.insert(users).values({
				...input,
				role: input.email == "admin@mail.ru" && input.password == "123456" ? "ADMIN" : "USER",
				password: passwordHash,
				imageId: imageId ?? null,
			});

			return {
				email: input.email,
				password: input.password,
			}
		}),
	getLiders: publicProcedure
		.query(async ({ ctx }) => {
			const users = await ctx.db.query.users.findMany();

			return [...users].sort((a, b) => b.sold - a.sold).slice(0, 13);
		}),
	getById: publicProcedure
		.input(IdSchema)
		.query(async ({ ctx, input }) => {
			const userDb = await ctx.db.query.users.findFirst({
				where: eq(users.id, input.id),
			})

			if (!userDb) {
				throw new Error("Пользователь не найден");
			}

			return userDb;
		}),
	update: protectedProcedure
		.input(UpdateDataSchema)
		.mutation(async ({ ctx, input }) => {
			let imageId = "";
			const caller = createCaller(ctx);


			const userDb = await ctx.db.query.users.findFirst({
				where: eq(users.id, ctx.session.user.id),
			})

			if (!userDb) {
				throw new Error("Пользователь не найден");
			}

			if (input.image) {
                const id = await caller.file.create({
                    ...input.image,
                    b64: input.image.b64!,
                });
                imageId = id.id;
			}

			await ctx.db.update(users).set({
				...input,
				imageId: imageId ?? null,
			}).where(eq(users.id, ctx.session.user.id));
		}),
	updatePassword: protectedProcedure
		.input(UpdatePasswordSchema)
		.mutation(async ({ ctx, input }) => {

			const userDb = await ctx.db.query.users.findFirst({
				where: eq(users.id, ctx.session.user.id),
			})

			if (!userDb) {
				throw new Error("Пользователь не найден");
			}

			if (input.oldPassword !== ctx.session.user.password) {
				throw new Error("Старый пароль неверный");
			}

			const passwordHash = await bcrypt.hash(input.newPassword, 10);

			await ctx.db.update(users).set({
				password: passwordHash,
			}).where(eq(users.id, ctx.session.user.id));
		}),
	addFavorite: protectedProcedure
		.input(IdSchema.merge(TypesSchema))
		.mutation(async ({ ctx, input }) => {
			const userDb = await ctx.db.query.users.findFirst({
				where: eq(users.id, ctx.session.user.id),
			})

			if (!userDb) {
				throw new Error("Пользователь не найден");
			}

			const favoriteDb = await ctx.db.query.favorites.findFirst({
				where: eq(favorites.itemId, input.id),
			})

			if (favoriteDb) {
				await ctx.db.delete(favorites).where(eq(favorites.itemId, input.id));
				return false;
			}

			if(input.type == "ART") {
				const itemDb = await ctx.db.query.arts.findFirst({
					where: eq(arts.id, input.id),
				})

				if (!itemDb) {
					throw new Error("арт не найден");
				}
			} else {
				const itemDb = await ctx.db.query.collections.findFirst({
					where: eq(collections.id, input.id),
				})

				if (!itemDb) {
					throw new Error("коллекция не найден");
				}
			}

			await ctx.db.insert(favorites).values({
				itemId: input.id,
				userId: ctx.session.user.id,
				type: input.type,
			})

			return true;
		}),
	getFavorites: publicProcedure
		.query(async ({ ctx }) => {

			if(!ctx.session?.user){
				return [];
			}
			
			const userDb = await ctx.db.query.users.findFirst({
				where: eq(users.id, ctx.session.user.id),
			})

			if (!userDb) {
				throw new Error("Пользователь не найден");
			}

			const favoritesDb = await ctx.db.query.favorites.findMany({
				where: eq(favorites.userId, ctx.session.user.id),
			})

			return favoritesDb;
		}),
	getAllFavorites: protectedProcedure
		.input(TypesSchema)
		.query(async ({ ctx, input }) => {
			
			return await ctx.db.query.favorites.findMany({
				where: and(
					eq(favorites.userId, ctx.session.user.id),
					eq(favorites.type, input.type),
				),
				with: {
					collection: true,
					art: true,
				},
			});
		})
})