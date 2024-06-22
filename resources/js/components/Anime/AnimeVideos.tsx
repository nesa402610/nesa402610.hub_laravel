import React, {FC, useEffect, useState} from "react";
import {useGetAnimeVideosQuery} from "services/Anime/AnimeService";
import Loader from "../Loader";
import Episodes from "./videos/Episodes";
import NonVideosInfo from "./videos/NonVideosInfo";
import {IAnimeVideos} from "types/Anime";


interface AnimeVideosProps {
    animeID: number;
    videosData?: any;
}

const AnimeVideos: FC<AnimeVideosProps> = ({animeID, videosData}) => {
    const {data: videos, isLoading} = videosData ?? useGetAnimeVideosQuery(animeID);
    const [autoPlay, setAutoPlay] = useState(JSON.parse(localStorage.getItem("autoplay")) ?? true);
    const [video, setVideo] = useState<IAnimeVideos>(null);

    const [episode, setEpisode] = useState(1);

    const autoplayHandler = () => {
        setAutoPlay(prev => {
            localStorage.setItem("autoplay", JSON.stringify(!prev));
            return !prev;
        });
    };

    useEffect(() => {
        const videoData = videos?.find(video => video.episode === episode)
        setVideo(videoData)
    }, [videos, episode]);

    if (isLoading) return <Loader text={"Ищем видосы"}/>;
    if (!video) return <NonVideosInfo/>
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
            {!video?.iframe ?
                <div className={"flex justify-center"}>
                    <video className={"md:h-[640px] rounded-lg h-auto"}
                           controls
                           autoPlay={autoPlay}
                           onLoadStart={e => e.currentTarget.volume = 0.2}
                           src={video.link}/>
                </div>
                :
                <iframe src={video.link}
                        width="100%"
                        height="640"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture;"
                        frameBorder="0"
                        key={video.id}
                        className={"rounded-lg"}
                        allowFullScreen/>
            }
        </div>
    );
};

export default AnimeVideos;
