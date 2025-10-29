import {
	type DefaultSession,
	type NextAuthOptions,
	getServerSession,
} from "next-auth";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: NonNullable<Awaited<ReturnType<typeof GetUser>>> &
			DefaultSession["user"];
	}
}

async function GetUser(data: { email: string }) {
	return (
		(await db.query.users.findFirst({
			where: eq(users.email, data.email),
			columns: {
				id: true,
				email: true,
				name: true,
				password: true,
				role: true,
				imageId: true,
				sold: true,
				createdAt: true,
			},
		})) ?? null
	);
}

export const authOptions: NextAuthOptions = {
	callbacks: {
		redirect({ baseUrl }) {
			return baseUrl;
		},
		session: async ({ session }) => {
			const user = await GetUser({
				email: session.user.email,
			});

			if (!user) {
				throw new Error("Такого пользователя нет");
			}
			return {
				...session,
				user: user,
			};
		},
	},

	providers: [
		CredentialsProvider({
			id: "credentials",
			credentials: {
				email: { type: "text" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					throw new Error("Не указаны данные для авторизации.");
				}

				const user = await db.query.users.findFirst({
					where: eq(users.email, credentials.email),
					columns: {
						id: true,
						email: true,
						password: true,
					},
				});

				if (!user) {
					throw new Error("Пользователь с таким Email не найден.");
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password,
					user?.password ?? "",
				);

				if (!passwordMatch) {
					throw new Error("Неверный логин или пароль");
				}

				return await GetUser({
					email: credentials.email,
				});
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: env.NEXTAUTH_SECRET,
	},
	pages: {
		signIn: "/login",
		signOut: "/logout",
	},
	secret: env.NEXTAUTH_SECRET,
	debug: env.NODE_ENV === "development",
};

export const getServerAuthSession = () => getServerSession(authOptions);
export const getNonNullableServerAuthSession = async () =>
	(await getServerSession(authOptions))!;
