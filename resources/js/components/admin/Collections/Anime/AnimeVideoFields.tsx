import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {RxCross2} from "react-icons/rx";
import {useDeleteAnimeVideoMutation} from "services/Anime/AnimeService";
import {IAnimeVideos} from "types/Anime";
import Episodes from "./AnimeVideoFields/Episodes";

interface AnimeVideoFieldsProps {
    videos: IAnimeVideos[];
    setVideos: Dispatch<SetStateAction<IAnimeVideos[]>>;
}

const AnimeVideoFields: FC<AnimeVideoFieldsProps> = ({videos, setVideos}) => {
    const [episode, setEpisode] = useState(0);
    const [deleteAnimeVideo] = useDeleteAnimeVideoMutation();
    const setLinkHandler = (e, field) => {
        let targetVideo = videos[episode]
        const targetFreeVideos = videos.filter(video => video.episode !== targetVideo.episode);
        if (field === "iframe") {
            targetVideo = {...targetVideo, iframe: !targetVideo.iframe};
        } else targetVideo = {...targetVideo, [field]: e.target.value};

        const newSetVideos = [targetVideo, ...targetFreeVideos]
        setVideos([...newSetVideos.sort((a, b) => a.id - b.id)])

    };


    const addEpisodeHandler = () => {
        const newVideo = {link: "", episode: 1, player: "",team: '', iframe: false}
        if (!videos) {
            return setVideos([newVideo]);
        }
        setVideos([...videos, {...newVideo, episode: +(videos.at(-1).episode) + 1, id: videos.at(-1).episode + 1}]);
    };

    const deleteEpisodeHandler = (i, id) => {
        if (id) deleteAnimeVideo(id);
        if (videos.length === 1) {
            setVideos(null);
        } else {
            setVideos(videos.filter((video, index) => {
                setEpisode(index - 1)
                return index !== episode
            }));
        }
    };
    console.log(videos)
    return (
        <div className={"flex flex-col gap-4"}>
            {videos &&
                <>
                    <Episodes videos={videos} setEpisode={setEpisode} selectedEp={episode}/>
                    <div className={"relative bg-slate-700 p-4 rounded-lg"}>
                        <div className={"absolute right-4 hover:scale-110 hover:text-red-600"}
                             onClick={() => deleteEpisodeHandler(episode, videos[episode].id)}>
                            <RxCross2 size={"22px"}/>
                        </div>
                        <label>
                            <span>Ссылка</span>
                            <input type="text" value={videos[episode].link}
                                   onChange={(e) => setLinkHandler(e, "link")}/>
                        </label>
                        <label>
                            <span>Плеер</span>
                            <input type="text" value={videos[episode].player}
                                   onChange={(e) => setLinkHandler(e, "player")}/>
                        </label>
                        <label>
                            <span>Команда</span>
                            <input type="text" value={videos[episode].team}
                                   onChange={(e) => setLinkHandler(e, "team")}/>
                        </label>
                        <label className={"flex gap-2"}>
                            IFrame?
                            <input className={"w-auto"}
                                   type="checkbox"
                                   checked={videos[episode].iframe}
                                   onChange={e => setLinkHandler(e, "iframe")}/>
                        </label>
                        <label>
                            <span>Номер эпизода</span>
                            <input type="text"
                                   value={videos[episode].episode}
                                   onChange={(e) => setLinkHandler(e, "episode")}/>
                        </label>
                    </div>
                </>
            }
            <div>
                <button onClick={() => addEpisodeHandler()}
                        className={'bg-slate-600 hover:bg-slate-700 flex rounded-lg '}>
                    Добавить серию
                </button>
            </div>
        </div>
    )
        ;
};

export default AnimeVideoFields;
