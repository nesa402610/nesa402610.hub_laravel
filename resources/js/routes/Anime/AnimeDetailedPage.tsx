import React, {useEffect} from "react";
import {useParams} from "react-router";
import Loader from "components/Loader";
import {useGetAnimeByIdQuery, useGetAnimeRecommendationsQuery} from "services/Anime/AnimeService";
import AnimeVideos from "components/Anime/AnimeVideos";
import HCollectionCard from "components/Anime/AnimeCard/AnimeCard";
import AnimeCard_mini from "components/Anime/AnimeCard/AnimeCard_mini";

const AnimeDetailedPage = () => {
    // const [passkey, setPasskey] = useState('');
    // const passkey = localStorage.getItem("passkey");
    const {id} = useParams();
    const {data, isLoading: isLoadingAnime, isFetching: isFetchingAnime} = useGetAnimeByIdQuery(id)
    const {data: recs, isLoading: isLoadingRecs, isFetching: isFetchingRecs} = useGetAnimeRecommendationsQuery(+id)

    useEffect(() => {
        if (isFetchingAnime) return
        document.title = `Смотреть аниме ${data?.title_ru} // n/esa | hub`
        return () => {
            document.title = `n/esa | hub`
        }
    }, [isLoadingAnime]);
    if (isFetchingAnime || isFetchingRecs) return <Loader/>;

    return (
        <div className={"m-4 flex flex-col gap-4"}>
            <HCollectionCard collection={data}/>
            <AnimeVideos animeID={data.id}/>
            <div className={'block--light'}>
                <h3 className={'font-bold text-xl'}>Похожие аниме</h3>
                <div className={'grid grid-cols-7 gap-4 mt-4'}>
                    {recs.map(rec =>
                        <AnimeCard_mini key={rec.id} anime={rec}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeDetailedPage;
