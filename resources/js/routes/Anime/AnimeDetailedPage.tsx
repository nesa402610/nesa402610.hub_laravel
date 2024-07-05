import React, {useEffect} from "react";
import {useParams} from "react-router";
import Loader from "components/Loader";
import {useGetAnimeByIdQuery, useGetAnimeRecommendationsQuery} from "services/Anime/AnimeService";
import AnimeVideos from "components/Anime/AnimeVideos";
import AnimeCard from "components/Anime/AnimeCard/AnimeCard";
import AnimeCard_mini from "components/Anime/AnimeCard/AnimeCard_mini";

const AnimeDetailedPage = () => {
    // const [passkey, setPasskey] = useState('');
    // const passkey = localStorage.getItem("passkey");
    const {id} = useParams();
    const {data, isLoading: isLoadingAnime, isFetching: isFetchingAnime} = useGetAnimeByIdQuery(id)
    const {data: recs, isLoading: isLoadingRecs, isFetching: isFetchingRecs} = useGetAnimeRecommendationsQuery(+id)

    useEffect(() => {
        if (isFetchingAnime) return
        document.title = `${data?.title_ru || data?.title_original} // n/esa | hub`
        return () => {
            document.title = `n/esa | hub`
        }
    }, [isLoadingAnime]);
    if (isFetchingAnime || isFetchingRecs) return <Loader/>;

    return (
        <div className={"m-4 flex flex-col gap-4"}>
            <div>
                <AnimeCard collection={data}/>
                <div>
                    <h3>В списках</h3>
                    <div>

                    </div>
                </div>
            </div>
            <AnimeVideos animeID={data.id}/>
            <div className={'block--light'}>
                <h3 className={'font-bold text-xl'}>Похожие аниме</h3>
                <div className={'grid lg:grid-cols-7 xs:grid-cols-1 sm:grid-cols-4 gap-4 mt-4'}>
                    {recs.map(rec =>
                        <AnimeCard_mini key={rec.id} anime={rec} hideStatus/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnimeDetailedPage;
