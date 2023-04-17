import React, {Dispatch, FC, SetStateAction} from "react";
import {RxCross2} from "react-icons/rx";
import {useDeleteAnimeVideoMutation} from "../../../../services/Collections/AnimeService";
import {ILinks} from "../../../../types/Anime";

interface AnimeVideoFieldsProps {
  videos: ILinks[]
  setVideos: Dispatch<SetStateAction<ILinks[]>>
}

const AnimeVideoFields: FC<AnimeVideoFieldsProps> = ({videos, setVideos}) => {
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
  };

  const deleteEpisodeHandler = (i, id) => {
    if (id) deleteAnimeVideo(id);
    if (videos.length === 1) {
      setVideos(null);
    } else setVideos(videos.filter((video, index) => index !== i));
  };
  return (
    <div className={"flex flex-col gap-4"}>
      {videos?.map((videoLink, index) =>
        <div key={videoLink.id} className={"relative bg-slate-700 p-4 rounded-lg"}>
          <div className={"absolute right-4 hover:scale-110 hover:text-red-600"}
               onClick={() => deleteEpisodeHandler(index, videoLink.id)}>
            <RxCross2 size={"22px"}/>
          </div>
          <label>
            <span>Ссылка</span>
            <input type="text" value={videoLink.link}
                   onChange={(e) => setLinkHandler(e, videoLink.id, "link")}/>
          </label>
          <label>
            <span>Платформа</span>
            <input type="text" value={videoLink.platform}
                   onChange={(e) => setLinkHandler(e, videoLink.id, "platform")}/>
          </label>
          <label className={"flex gap-2"}>
            IFrame?
            <input className={"w-auto"}
                   type="checkbox"
                   checked={videoLink.iframe}
                   onChange={e => setLinkHandler(e, videoLink.id, "iframe")}/>
          </label>
          <label>
            <span>Номер эпизода</span>
            <input type="text"
                   value={videoLink.episode}
                   onChange={(e) => setLinkHandler(e, videoLink.id, "episode")}/>
          </label>
        </div>
      )}
      <div onClick={() => addEpisodeHandler()}>
        add new episode
      </div>
    </div>
  );
};

export default AnimeVideoFields;
