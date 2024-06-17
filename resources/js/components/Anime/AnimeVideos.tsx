import React, {FC, useState} from "react";
import {useGetAnimeVideosQuery} from "services/Anime/AnimeService";
import Loader from "../Loader";
import Episodes from "./videos/Episodes";
import NonVideosInfo from "./videos/NonVideosInfo";


interface AnimeVideosProps {
    animeID: number;
    videosData?: any;
}

const AnimeVideos: FC<AnimeVideosProps> = ({animeID, videosData}) => {
    const {data: videos, isLoading} = videosData ?? useGetAnimeVideosQuery(animeID);
    const [autoPlay, setAutoPlay] = useState(JSON.parse(localStorage.getItem("autoplay")) ?? true);

    const [episode, setEpisode] = useState(1);

    const autoplayHandler = () => {
        setAutoPlay(prev => {
            localStorage.setItem("autoplay", JSON.stringify(!prev));
            return !prev;
        });
    };

    if (isLoading) return <Loader text={"Ищем видосы"}/>;
    if (!videos) return <NonVideosInfo/>
    return (
        <div className={"block--light gap-4 flex flex-col"}>
            <div className={"flex gap-4 justify-between md:flex-row xs:flex-col"}>
                <Episodes videos={videos} episode={episode} setEpisode={setEpisode} animeID={animeID}/>
                <div className={"flex gap-4 items-start flex-grow-1 basis-auto flex-shrink-0"}>
                    <div
                        className={"md:p-4 p-2 rounded-lg flex items-center " + (autoPlay ? "bg-lime-600" : "bg-red-800")}
                        onClick={autoplayHandler}
                    >
                        Автоплей видео
                    </div>
                    <div className={"bg-neutral-900 p-4 rounded-lg"}>
                        Не работает
                    </div>
                </div>
            </div>
            {!videos[episode - 1]?.iframe ?
                <div className={"flex justify-center"}>
                    <video className={"md:h-[640px] rounded-lg h-auto"}
                           controls
                           autoPlay={autoPlay}
                           onLoadStart={e => e.currentTarget.volume = 0.2}
                           src={videos[episode - 1].link}/>
                </div>
                :
                <iframe src={videos[episode - 1].link}
                        width="100%"
                        height="640"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                        frameBorder="0"
                        key={videos[episode - 1].id}
                        className={"rounded-lg"}
                        allowFullScreen/>
            }
        </div>
    );
};

export default AnimeVideos;
