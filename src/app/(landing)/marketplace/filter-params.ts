import { CategoriesParser } from "~/searchParams/categories";
import { SearchParser } from "~/searchParams/search";


export const filterParams = {
    ...CategoriesParser,
    ...SearchParser
}