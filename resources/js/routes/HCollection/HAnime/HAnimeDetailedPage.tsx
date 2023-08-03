import React, {useEffect} from "react";
import {useParams} from "react-router";
import Loader from "../../../components/Loader";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {useGetAnimeByIdQuery} from "../../../services/Collections/AnimeService";
import AnimeVideos from "../../../components/HCollection/AnimeVideos";

const HAnimeDetailedPage = () => {
    // const [passkey, setPasskey] = useState('');
    // const passkey = localStorage.getItem("passkey");
    const {id} = useParams();
    const {data, isLoading} = useGetAnimeByIdQuery(id)

    useEffect(() => {
        if (isLoading) return
        document.title = `Смотреть аниме ${data?.title_ru} // n/esa | hub`
        return () => {
            document.title = `n/esa | hub`
        }
    }, [isLoading]);
    if (isLoading) return <Loader/>;
    return (
        <div className={"m-4 flex flex-col gap-4"}>
            <HCollectionCard collection={data}/>
            <AnimeVideos animeID={data.id}/>
        </div>
    );
};

export default HAnimeDetailedPage;
