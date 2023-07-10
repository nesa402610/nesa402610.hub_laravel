import React from "react";
import {useParams} from "react-router";
import Loader from "../../../components/Loader";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {useGetAnimeByIdQuery} from "../../../services/Collections/AnimeService";
import AnimeVideos from "../../../components/HCollection/AnimeVideos";

const HAnimeDetailedPage = () => {
    const passkey = localStorage.getItem("passkey");
    const {id} = useParams();
    const {data} = useGetAnimeByIdQuery({id, passkey});

    if (!data) return <Loader/>;
    return (
        <div className={"m-4 flex flex-col gap-4"}>
            <HCollectionCard collection={data}/>
            <AnimeVideos anime={data}/>
        </div>
    );
};

export default HAnimeDetailedPage;
