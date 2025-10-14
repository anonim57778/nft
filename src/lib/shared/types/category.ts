import type { ArtCategoryEnum } from "~/server/db/schema";
import art from "../../../../public/images/art.svg";
import collectibles from "../../../../public/images/collectibles.svg";
import music from "../../../../public/images/music.svg";
import photography from "../../../../public/images/photography.svg";
import video from "../../../../public/images/video.svg";
import utility from "../../../../public/images/utility.svg";
import sport from "../../../../public/images/sport.svg";
import virtual from "../../../../public/images/virtual.svg";



export const categoriesData: Record<
  ArtCategoryEnum[number],
  {
    name: string;
    image: string;
    url: string;
  }> = {
    ART: {
        name: "ART",
        image: art as string,
        url: "/marketplace/?category=ART",
    },
    COLLECTIBLES: {
        name: "COLLECTIBLES",
        image: collectibles as string,
        url: "/marketplace/?category=COLLECTIBLES",
    },
    MUSIC: {
        name: "MUSIC",
        image: music as string,
        url: "/marketplace/?category=MUSIC",
    },
    PHOTOGRAPHY: {
        name: "PHOTOGRAPHY",
        image: photography as string,
        url: "/marketplace/?category=PHOTOGRAPHY",
    },
    VIDEO: {
        name: "VIDEO",
        image: video as string,
        url: "/marketplace/?category=VIDEO",
    },
    UTILITY: {
        name: "UTILITY",
        image: utility as string,
        url: "/marketplace/?category=UTILITY",
    },
    SPORT: {
        name: "SPORT",
        image: sport as string,
        url: "/marketplace/?category=SPORT",
    },
    VIRTUAL: {
        name: "VIRTUAL",
        image: virtual as string,
        url: "/marketplace/?category=VIRTUAL",
    },
  }