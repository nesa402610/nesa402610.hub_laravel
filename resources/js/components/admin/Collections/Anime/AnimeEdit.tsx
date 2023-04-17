import React, {useEffect, useState} from "react";
import {
  useGetAnimeByIdQuery,
  useGetAnimeVideosQuery,
  useUpdateAnimeMutation
} from "../../../../services/Collections/AnimeService";
import {useParams} from "react-router";
import Loader from "../../../Loader";
import HCollectionCard from "../../../HCollection/HCollectionCard";
import {IAnime, IAnimeVideos} from "../../../../types/Anime";
import AnimeVideos from "../../../HCollection/AnimeVideos";
import AnimeFields from "../Anime/AnimeFields";
import AnimeVideoFields from "./AnimeVideoFields";

const AnimeEdit = () => {
  const {id} = useParams();
  const {data} = useGetAnimeByIdQuery({id});
  const videosResponse = useGetAnimeVideosQuery(id);
  const {data: videosData} = videosResponse;
  const [updateAnime] = useUpdateAnimeMutation();
  const [preview, setPreview] = useState(true);
  const [anime, setAnime] = useState<IAnime>(null);
  const [videos, setVideos] = useState<IAnimeVideos[]>(null);
  useEffect(() => {
    setAnime(data);
  }, [data]);
  useEffect(() => {
    setVideos(videosData);
  }, [videosData]);

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
      <AnimeFields anime={anime} setAnime={setAnime}/>
      <AnimeVideoFields setVideos={setVideos} videos={videos}/>
      {preview && <>
        <HCollectionCard collection={anime} addTag={null} removeTag={null}/>
        <AnimeVideos anime={anime} videosData={{...videosResponse, data: videos}}/>
      </>}
    </div>
  );
};

export default AnimeEdit;
