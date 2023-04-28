import React from "react";
import {Link} from "react-router-dom";
import {
  useAddTagToAnimeMutation,
  useGetAllAnimeNPQuery,
  useRemoveTagMutation
} from "../../../services/Collections/AnimeService";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";

const Anime = () => {
  const {data} = useGetAllAnimeNPQuery(null);
  const [addTag] = useAddTagToAnimeMutation();
  const [removeTag] = useRemoveTagMutation();
  return (
    <div className={"flex flex-col gap-4"}>
      <Link to={"new"}>создать</Link>
      {data?.map(anime =>
        <HCollectionCard link collection={anime} addTag={addTag} removeTag={removeTag}/>
      )}
    </div>
  );
};

export default Anime;
