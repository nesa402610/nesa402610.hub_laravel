export interface IAnimeStudio {
    id: number;
    name: string;
}

export interface IAnimeVideos {
    id?: number,
    link: string,
    platform: string,
    episode: number,
    iframe: boolean
}
