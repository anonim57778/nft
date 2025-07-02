"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";

export default function LogoutPage() {
	const router = useRouter();
	const utils = api.useUtils();

	useEffect(() => {
		void signOut({ redirect: true })
			.then(() => {
				void utils.user.session.invalidate();
				router.push("/");
			})
			.catch((error) => {
				console.error("Ошибка при выходе из системы:", error);
			});
	}, [router, utils.user.session]);

	return (
		<div className="h-screen w-screen flex items-center justify-center text-white">
			<h1>Выходим...</h1>
		</div>
	);
}
