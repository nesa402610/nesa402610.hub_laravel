import {ICollectionTag} from "./Tag";
import {IAnimeStudio} from "./Anime";


// export interface ILevel {
//     ico: any,
//     grade: number,
//     name: string
// }


export interface ICollection {
    genres: ICollectionTag[];
    kind: string;
    videosCount: number;
    type: number
    rating: number;
    style: number;
    review: string;
    status: number
    id: number;
    title_ru: string;
    title_en: string;
    title_original: string;
    description: string;
    description_short: string;
    episode_time: number;
    censure: boolean;
    tags: ICollectionTag[];
    links: { id: number, link: string, platform: string, episode: 1, iframe: boolean }[];
    image: string;
    announce_date: string;
    release_date: string;
    episodes_released: number;
    episodes_total: number;
    studios: IAnimeStudio[];
    origins: string;
    author: string;
    created_at: string;
}



