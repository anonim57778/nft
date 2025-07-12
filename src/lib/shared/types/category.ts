import type { NftCategoryEnum } from "~/server/db/schema";
import art from "../../../../public/images/art.svg";
import collectibles from "../../../../public/images/collectibles.svg";
import music from "../../../../public/images/music.svg";
import photography from "../../../../public/images/photography.svg";
import video from "../../../../public/images/video.svg";
import utility from "../../../../public/images/utility.svg";
import sport from "../../../../public/images/sport.svg";
import virtual from "../../../../public/images/virtual.svg";



export const categoriesData: Record<
  NftCategoryEnum[number],
  {
    name: string;
    image: string;
    url: string;
  }> = {
    ART: {
        name: "ART",
        image: art,
        url: "/marketplace/?category=ART",
    },
    COLLECTIBLES: {
        name: "COLLECTIBLES",
        image: collectibles,
        url: "/marketplace/?category=COLLECTIBLES",
    },
    MUSIC: {
        name: "MUSIC",
        image: music,
        url: "/marketplace/?category=MUSIC",
    },
    PHOTOGRAPHY: {
        name: "PHOTOGRAPHY",
        image: photography,
        url: "/marketplace/?category=PHOTOGRAPHY",
    },
    VIDEO: {
        name: "VIDEO",
        image: video,
        url: "/marketplace/?category=VIDEO",
    },
    UTILITY: {
        name: "UTILITY",
        image: utility,
        url: "/marketplace/?category=UTILITY",
    },
    SPORT: {
        name: "SPORT",
        image: sport,
        url: "/marketplace/?category=SPORT",
    },
    VIRTUAL: {
        name: "VIRTUAL",
        image: virtual,
        url: "/marketplace/?category=VIRTUAL",
    },
  }