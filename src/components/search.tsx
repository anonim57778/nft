"use client";

import { Search as SearchIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { SearchParser } from "~/searchParams/search";

export default function Search({ className }: { className?: string }) {
	const [{ search }, setSearch] = useQueryStates(SearchParser, {
		shallow: false,
	});

	return (
		<div className="relative flex items-end gap-6 w-full">
			<div className="absolute right-2 top-0 flex aspect-square h-full items-center justify-center">
				<SearchIcon className="size-5 opacity-60" />
			</div>
			<Input
				value={search ?? ""}
				onChange={(e) => setSearch({ search: e.target.value })}
				placeholder="Поиск"
				className={cn("w-full pl-6 pr-14 h-[60px] py-6 rounded-[20px] border border-card bg-background placeholder:text-white text-white", className)}
			/>
		</div>
	);
}
