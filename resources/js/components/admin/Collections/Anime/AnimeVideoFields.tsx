import React, {Dispatch, FC, SetStateAction, useState} from "react";
import {RxCross2} from "react-icons/rx";
import {useDeleteAnimeVideoMutation} from "../../../../services/Collections/AnimeService";
import {IAnimeVideos} from "../../../../types/Anime";

interface AnimeVideoFieldsProps {
    videos: IAnimeVideos[];
    setVideos: Dispatch<SetStateAction<IAnimeVideos[]>>;
}

const AnimeVideoFields: FC<AnimeVideoFieldsProps> = ({videos, setVideos}) => {
    const [episode, setEpisode] = useState(1);
    const [deleteAnimeVideo] = useDeleteAnimeVideoMutation();
    const setLinkHandler = (e, id, field) => {
        let targetVideo = videos.filter(video => video.id === id)[0];
        if (field === "iframe") {
            targetVideo = {...targetVideo, iframe: !targetVideo.iframe};
        } else targetVideo = {...targetVideo, [field]: e.target.value};

        const targetFreeVideos = videos.filter(video => video.id !== id);
        const newSetVideos = [targetVideo, ...targetFreeVideos].sort((a, b) => a.episode - b.episode);
        setVideos(newSetVideos);
    };

    const addEpisodeHandler = () => {
        if (!videos) {
            return setVideos([{link: "", episode: 1, platform: "", iframe: false}]);
        }
        setVideos([...videos, {link: "", episode: videos.at(-1).episode + 1, platform: "", iframe: false}]);
        console.log(videos)
    };

    const deleteEpisodeHandler = (i, id) => {
        if (id) deleteAnimeVideo(id);
        if (videos.length === 1) {
            setVideos(null);
        } else setVideos(videos.filter((video, index) => index !== i));
    };
    return (
        <div className={"flex flex-col gap-4"}>
            {videos &&
                <>
                    <div className={"flex gap-4"}>
                        {videos?.map(video =>
                            <div
                                className={`${video.episode === episode ? 'bg-slate-500' : 'bg-slate-700'} rounded-lg p-2`}
                                onClick={() => setEpisode(video.episode)}>
                                Серия {video.episode}
                            </div>
                        )}
                    </div>
                    <div className={"relative bg-slate-700 p-4 rounded-lg"}>
                        <div className={"absolute right-4 hover:scale-110 hover:text-red-600"}
                             onClick={() => deleteEpisodeHandler(episode, videos[episode - 1].id)}>
                            <RxCross2 size={"22px"}/>
                        </div>
                        <label>
                            <span>Ссылка</span>
                            <input type="text" value={videos[episode - 1].link}
                                   onChange={(e) => setLinkHandler(e, videos[episode - 1].id, "link")}/>
                        </label>
                        <label>
                            <span>Платформа</span>
                            <input type="text" value={videos[episode - 1].platform}
                                   onChange={(e) => setLinkHandler(e, videos[episode - 1].id, "platform")}/>
                        </label>
                        <label className={"flex gap-2"}>
                            IFrame?
                            <input className={"w-auto"}
                                   type="checkbox"
                                   checked={videos[episode - 1].iframe}
                                   onChange={e => setLinkHandler(e, videos[episode - 1].id, "iframe")}/>
                        </label>
                        <label>
                            <span>Номер эпизода</span>
                            <input type="text"
                                   value={videos[episode - 1].episode}
                                   onChange={(e) => setLinkHandler(e, videos[episode - 1].id, "episode")}/>
                        </label>
                    </div>
                </>
            }
            <div onClick={() => addEpisodeHandler()}>
                add new episode
            </div>
        </div>
    );
};

export default AnimeVideoFields;
