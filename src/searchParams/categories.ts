import { parseAsStringEnum } from "nuqs/server";
import { artsCategoriesEnum } from "~/server/db/schema";

export const CategoriesParser = {
    category: parseAsStringEnum(artsCategoriesEnum.enumValues),
};