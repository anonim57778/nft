import type { NftCategoryEnum } from "~/server/db/schema";


export function CategoriesToString(item: NftCategoryEnum) {

    switch (item) {
        case "ART":
            return "Арт";
        case "COLLECTIBLES":
            return "Коллекционные";
        case "MUSIC":
            return "Музыка";
        case "PHOTOGRAPHY":
            return "Фотография";
        case "VIDEO":
            return "Видео";
        case "UTILITY":
            return "Утилиты";
        case "SPORT":
            return "Спорт";
        case "VIRTUAL":
            return "Виртуальность";
    }
}