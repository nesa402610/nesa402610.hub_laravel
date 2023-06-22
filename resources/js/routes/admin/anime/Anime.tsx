import React from "react";
import {Link} from "react-router-dom";
import {
    useAddTagToAnimeMutation,
    useGetAllAnimeNPQuery,
    useRemoveTagMutation
} from "../../../services/Collections/AnimeService";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import Loader from "../../../components/Loader";

const Anime = () => {
    const {data, isLoading} = useGetAllAnimeNPQuery();
    const [addTag] = useAddTagToAnimeMutation();
    const [removeTag] = useRemoveTagMutation();
    if (isLoading) return <Loader/>
    return (
        <div className={"flex flex-col gap-4"}>
            <Link to={"new"}>создать</Link>
            {data?.map(anime =>
                <HCollectionCard key={anime.id} link collection={anime} addTag={addTag} removeTag={removeTag}/>
            )}
        </div>
    );
};

export default Anime;
