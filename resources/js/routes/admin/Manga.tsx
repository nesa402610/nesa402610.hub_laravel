import React from "react";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import {useGetAllMangaNPQuery} from "../../services/Collections/MangaService";

const Manga = () => {
    const {data} = useGetAllMangaNPQuery("");
    return (
        <div className={"flex flex-col gap-4"}>
            {data?.map(anime =>
                <HCollectionCard link collection={anime}/>
            )}
        </div>
    );
};

export default Manga;
