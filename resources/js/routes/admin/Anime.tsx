import React from "react";
import {useGetAllAnimeNPQuery} from "../../services/Collections/AnimeService";
import HCollectionCard from "../../components/HCollection/HCollectionCard";

const Anime = () => {
  const {data} = useGetAllAnimeNPQuery("");
  return (
    <div className={"flex flex-col gap-4"}>
      {data?.map(anime =>
        <HCollectionCard link collection={anime} addTag={null} removeTag={null}/>
      )}
    </div>
  );
};

export default Anime;
