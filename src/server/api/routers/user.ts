import { RegisterSchema } from "~/lib/shared/types/user";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcryptjs";
import { users } from "~/server/db/schema";
import { createCaller } from "../root";
import { eq } from "drizzle-orm";
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
				password: passwordHash,
				imageId: imageId,
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
})