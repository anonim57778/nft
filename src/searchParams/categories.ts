import { parseAsStringEnum } from "nuqs/server";
import { nftCategoriesEnum } from "~/server/db/schema";

export const CategoriesParser = {
    category: parseAsStringEnum(nftCategoriesEnum.enumValues),
};