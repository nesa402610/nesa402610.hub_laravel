import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAddAnimeMutation} from "../../../services/Collections/AnimeService";
import {IAnime} from "../../../types/Anime";
import AnimeFields from "../../../components/admin/Collections/Anime/AnimeFields";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";

const AnimeCreate = () => {
  const [createAnime, {data}] = useAddAnimeMutation();
  const nav = useNavigate();
  const [anime, setAnime] = useState<IAnime>({
    announce_date: "",
    author: "",
    censure: false,
    created_at: "",
    description: "",
    description_short: "",
    episode_time: 0,
    episodes_released: 0,
    episodes_total: 0,
    id: 0,
    image: "",
    origins: "",
    release_date: "",
    review: "",
    studios: [],
    tags: [],
    title_en: "",
    title_original: "",
    title_ru: ""
  });
  const createAnimeHandler = () => {
    createAnime(anime).then(() => {
      nav("/admin/anime" + data.id);
    });
  };
  return (
    <div className={"flex flex-col gap-4"}>
      <button onClick={createAnimeHandler}>Создать</button>
      <AnimeFields anime={anime} setAnime={setAnime}/>
      <HCollectionCard collection={anime} addTag={null} removeTag={null}/>
    </div>
  );
};

export default AnimeCreate;
