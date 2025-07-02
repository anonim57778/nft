import { RegisterSchema } from "~/lib/shared/types/user";
import { createTRPCRouter, publicProcedure } from "../trpc";
import bcrypt from "bcrypt";
import { users } from "~/server/db/schema";
import { createCaller } from "../root";

export const userRouter = createTRPCRouter({
    session: publicProcedure.query(async ({ ctx }) => {
		return {
			session: ctx.session,
		};
	}),
	register: publicProcedure
		.input(RegisterSchema)
		.mutation(async ({ ctx, input }) => {
			let imageId: string  = "";
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
		})
})