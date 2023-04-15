import React, {useEffect, useState} from "react";
import {
  useDeleteAnimeVideoMutation,
  useGetAnimeByIdQuery,
  useGetAnimeVideosQuery,
  useUpdateAnimeMutation
} from "../../../services/Collections/AnimeService";
import {useParams} from "react-router";
import Loader from "../../Loader";
import HCollectionCard from "../../HCollection/HCollectionCard";
import {IAnime, ILinks} from "../../../types/Anime";
import AnimeVideos from "../../HCollection/AnimeVideos";
import {RxCross2} from "react-icons/rx";

const AnimeEdit = () => {
  const {id} = useParams();
  const {data, isLoading} = useGetAnimeByIdQuery({id});
  const videosResponse = useGetAnimeVideosQuery(id);
  const {data: videosData, isLoading: videosLoading} = videosResponse;
  const [updateAnime] = useUpdateAnimeMutation();
  const [preview, setPreview] = useState(true);
  const [anime, setAnime] = useState<IAnime>(null);
  const [videos, setVideos] = useState<ILinks[]>(null);
  const [deleteAnimeVideo] = useDeleteAnimeVideoMutation();
  console.log(videosData);
  useEffect(() => {
    setAnime(data);
  }, [data]);
  useEffect(() => {
    setVideos(videosData);
  }, [videosData]);

  const setHandler = (e, field) => {
    setAnime({...anime, [field]: e.target.value});
  };
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
      setVideos([{link: "", episode: 1, platform: "", iframe: false}]);
    }
    setVideos([...videos, {link: "", episode: videos.at(-1).episode + 1, platform: "", iframe: false}]);
  };
  const deleteEpisodeHandler = (i, id) => {
    deleteAnimeVideo(id);
    if (videos.length === 1) {
      setVideos(null);
    } else setVideos(videos.filter((video, index) => index !== i));
  };
  if (!anime) return <Loader/>;
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex gap-4"}>
        <button onClick={() => setPreview(!preview)}
                className={"bg-slate-600"}>
          Toggle preview
        </button>
        <button onClick={() => {
          setAnime(data);
          setVideos(videosData);
        }}
                className={"bg-slate-600"}>
          Отмена
        </button>
        <button onClick={() => updateAnime({anime, videos})}
                className={"bg-slate-600"}>
          Обновить данные
        </button>
      </div>
      <div className={"flex flex-col"}>
        {Object.keys(anime).map(key => {
            if (key === "tags" || key === "studios" || key === "id") {
              return;
            }
            if (key === "description") {
              return (
                <label key={key} className={"flex flex-col"}>
                  <span>{key}</span>
                  <textarea className={"bg-neutral-600 p-2 rounded-lg"}
                            value={anime[key]}
                            onChange={e => setHandler(e, key)}/>
                </label>
              );
            }
            return (
              <label key={key}>
                <span>{key}</span>
                <input type="text" value={anime[key]} onChange={e => setHandler(e, key)}/>
              </label>
            );
          }
        )}
      </div>
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
      {preview && <>
        <HCollectionCard collection={anime} addTag={null} removeTag={null}/>
        <AnimeVideos anime={anime} videosData={{...videosResponse, data: videos}}/>
      </>}
    </div>
  );
};

export default AnimeEdit;
