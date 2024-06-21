import {IAnimeTag} from "./Tag";
import {IAnimeStudio} from "./Anime";


// export interface ILevel {
//     ico: any,
//     grade: number,
//     name: string
// }


export interface ICollection {
    shiki_id: number;
    shiki_score: number
    status: number
    score: number | null;
    genres: IAnimeTag[];
    kind: string;
    videosCount: number;
    type: number
    rating: string;
    style: number;
    review: string;
    userStatus?: {
        id: number
        status: number | null
        watched_episodes: number | null,
        note: string | null,
        score: number | null,
        favorite: boolean
    }
    id: number;
    title_ru: string;
    title_en: string;
    title_original: string;
    description: string;
    description_short: string;
    episode_time: number;
    censure: boolean;
    tags: IAnimeTag[];
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

export interface paginatedData<T> {
    data: T,
    current_page: number;
    last_page: number;
}



