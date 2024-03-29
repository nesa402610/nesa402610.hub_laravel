import React, {FC, useState} from "react";
import InfoBox from "../UI/InfoBox";
import {useGetAnimeVideosQuery} from "../../services/Collections/AnimeService";
import Loader from "../Loader";

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
    if (!videos) {
    return (
      <InfoBox title={"Причины отсутствия видео"}>
        <ul className={"py-2 px-4 list-inside list-disc"}>
          <li>Я не нашел прямых ссылок на видео</li>
          <li>Мне могут дать пизды видео</li>
          <li>Мне дали пизды за видео</li>
          <li>Мне почти дали пизды за видео</li>
          <li>Мне лень было добавлять их ✨</li>
        </ul>
      </InfoBox>
    );
  }
  return (
    <div className={"block--light gap-4 flex flex-col"}>
      <div className={"flex gap-4 justify-between md:flex-row xs:flex-col"}>
        <div className={"md:flex md:gap-4 xs:gap-2 gap-2 md:flex-nowrap xs:flex-wrap xs:grid xs:grid-cols-3"}>
          {videos.map((link, index) =>
            <div key={link.id} onClick={() => setEpisode(index + 1)}
                 className={"flex whitespace-nowrap xs:basis-1/4 xs:flex-1 md:p-4 xs:p-2 rounded-lg " + (episode === index + 1 ? "bg-neutral-900" : "bg-neutral-800")}>
                Серия {link.episode}
            </div>
          )}
        </div>

        <div className={"flex gap-4"}>
          <div className={"md:p-4 p-2 rounded-lg flex items-center " + (autoPlay ? "bg-lime-600" : "bg-red-800")}
               onClick={autoplayHandler}
          >
            Автоплей видео
          </div>
          <div className={"bg-neutral-900 p-4 rounded-lg"}>
            Не работает
          </div>
        </div>
      </div>
      {!videos[episode - 1]?.iframe ? <div className={"flex justify-center"}>
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
                className={"rounded-lg"}
                allowFullScreen/>
      }
    </div>
  );
};

export default AnimeVideos;
