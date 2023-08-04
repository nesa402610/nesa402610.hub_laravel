import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {
    useGetAnimeByIdQuery,
    useGetAnimeVideosQuery,
    useUpdateAnimeMutation
} from "../../../services/Collections/AnimeService";
import {IAnimeVideos} from "../../../types/Anime";
import Loader from "../../../components/Loader";
import AnimeFields from "../../../components/admin/Collections/Anime/AnimeFields";
import AnimeVideoFields from "../../../components/admin/Collections/Anime/AnimeVideoFields";
import AnimeVideos from "../../../components/HCollection/AnimeVideos";
import {ICollection} from "../../../types/types";
import HCollectionCard from "../../../components/HCollection/CollectionCard/HCollectionCard";

const AnimeEdit = () => {
    const {id} = useParams();
    const {data: animeData, isLoading} = useGetAnimeByIdQuery(id)
    const videosResponse = useGetAnimeVideosQuery(id);
    const {data: videosData} = videosResponse;
    const [updateAnime] = useUpdateAnimeMutation();
    const [preview, setPreview] = useState(true);
    const [anime, setAnime] = useState<ICollection>(null);
    const [videos, setVideos] = useState<IAnimeVideos[]>(null);

    useEffect(() => {
        setAnime(animeData);
    }, [animeData]);
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
                    setAnime(animeData);
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
            {preview &&
                <>
                    <HCollectionCard collection={anime}/>
                    <AnimeVideos animeID={anime.id} videosData={{...videosResponse, data: videos}}/>
                </>
            }
        </div>
    );
};

export default AnimeEdit;
