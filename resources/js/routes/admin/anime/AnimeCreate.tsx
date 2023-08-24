import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAddAnimeMutation} from "services/Collections/AnimeService";
import AnimeFields from "../../../components/admin/Collections/Anime/AnimeFields";
import Loader from "../../../components/Loader";
import {ICollection} from "types/types";
import HCollectionCard from "../../../components/HCollection/CollectionCard/HCollectionCard";

const AnimeCreate = () => {
    const [createAnime, {isLoading}] = useAddAnimeMutation();
    const nav = useNavigate();
    const [anime, setAnime] = useState<ICollection>({
        announce_date: "",
        author: "",
        videosCount: 0,
        links: [],
        type: 0,
        censure: false,
        created_at: "",
        description: "",
        description_short: '',
        episode_time: 0,
        episodes_released: 0,
        episodes_total: 0,
        id: 0,
        kind: 'tv',
        image: "",
        origins: "",
        release_date: "",
        review: "",
        studios: [],
        tags: [],
        title_en: "",
        title_original: "",
        title_ru: "",
        status: 0,
        rating: 0,
        style: 0

    });
    const createAnimeHandler = async () => {
        createAnime(anime)
            .unwrap()
            .then(r => {
                nav("/admin/anime/" + r.id);

            })
    };
    if (isLoading) return <Loader/>
    return (
        <div className={"flex flex-col gap-4"}>
            <button onClick={createAnimeHandler}>Создать</button>
            <AnimeFields anime={anime} setAnime={setAnime}/>
            <HCollectionCard collection={anime}/>
        </div>
    );
};

export default AnimeCreate;
