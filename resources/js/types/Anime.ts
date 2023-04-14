import {ICollectionStudio, ICollectionTag} from "./types";

interface paginate {
  current_page: number
  last_page: number
}
export interface IAnime{
  id: number;
  title_ru: string;
  title_en: string;
  title_original: string;
  description: string;
  description_short: string;
  episode_time: number;
  censure: boolean;
  tags: ICollectionTag[];
  links: ILinks[];
  image: string;
  announce_date: string;
  release_date: string;
  episodes_released: number;
  episodes_total: number;
  studios: ICollectionStudio[];
  origins: string;
  author: string;
  created_at: string;
}

export interface ILinks {
  id?: number,
  link: string,
  platform: string,
  episode: number,
  iframe: boolean
}
