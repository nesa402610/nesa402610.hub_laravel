import React from "react";
import {useGetAllMangaNPQuery} from "services/Collections/MangaService";
import HCollectionCard from "../../components/HCollection/CollectionCard/HCollectionCard";

const Manga = () => {
    const {data} = useGetAllMangaNPQuery("");
    return (
        <div className={"flex flex-col gap-4"}>
            {data?.map(manga =>
                <HCollectionCard link collection={manga}/>
            )}
        </div>
    );
};

export default Manga;
