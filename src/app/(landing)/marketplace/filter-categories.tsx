"use client";
import { useQueryStates } from "nuqs";
import { useState, useEffect } from "react";
import { filterParams } from "./filter-params";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { X } from "lucide-react";
import { cn } from "~/lib/utils";
import { artsCategoriesEnum, type ArtCategoryEnum } from "~/server/db/schema";
import { CategoriesToString } from "~/lib/enums";

export default function FilterCategory() {
    const [{ category }, setCategory] = useQueryStates(filterParams, {
        shallow: false,
    });

    const [categoryFilter, setCategoryFilter] = useState<ArtCategoryEnum | null>(null);

    const clear = () => {
        setCategoryFilter(null);
    }

    useEffect(() => {
        if (categoryFilter !== category) {
            void setCategory({ category: categoryFilter });
        }
        console.log(categoryFilter);
    }, [categoryFilter, category, setCategory]);

    return (
        <div className="flex items-center gap-1">
            <div className="w-full">
                <Select
                    value={categoryFilter ?? ""}
                    onValueChange={(value) => setCategoryFilter(value as ArtCategoryEnum)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Фильтры" />
                    </SelectTrigger>
                    <SelectContent>
                        {artsCategoriesEnum.enumValues.map((item, i) => (
                            <SelectItem key={i} value={item}>
                                {CategoriesToString(item)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <X
                className={cn(categoryFilter ? "size-6 cursor-pointer text-red-500 block" : "hidden")}
                onClick={clear}
            />
        </div>
    );
}