import React, {useState} from "react";
import {Link} from "react-router-dom";
import {
    useDeleteAnimeDupliesMutation,
    useGetAllAnimeQuery,
    useGetAnimeDupliesQuery
} from "../../../services/Collections/AnimeService";
import Loader from "../../../components/Loader";
import Paginator from "../../../components/UI/Paginator";
import HCollectionCard from "../../../components/HCollection/CollectionCard/HCollectionCard";

const Anime = () => {
    const [isDuplies, setIsDuplies] = useState(false);
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching} = useGetAllAnimeQuery({page, query: {IPP: 50}})
    const [animes, lastPage, currentPage] = [data?.data, data?.last_page, data?.current_page]
    const {data: duples, isLoading: isLoadingDuplies} = useGetAnimeDupliesQuery()
    const [deleteDuplies] = useDeleteAnimeDupliesMutation()

    if (isLoadingDuplies || isLoading) return <Loader/>
    if (isDuplies) {
        return (
            <div className={"flex flex-col gap-4"}>
                <button onClick={() => setIsDuplies(false)}>Скрыть дубли</button>
                <button onClick={() => deleteDuplies()}>Удалить дубли</button>
                {duples.map(anime =>
                    <HCollectionCard admin key={anime.id} link collection={anime}/>
                )}
            </div>
        )
    }
    return (
        <div className={"flex flex-col gap-4 relative"}>
            {isFetching &&
                <div className={'z-40 absolute rounded-lg bg-neutral-700/70 h-full w-full'}>
                    <Loader center/>
                </div>
            }
            <div className={'flex gap-4'}>
                <Link to={"new"}>создать</Link>
                <button onClick={() => setIsDuplies(true)}>Показать дубли</button>
            </div>
            {animes.map(anime =>
                <HCollectionCard admin key={anime.id} link collection={anime}/>
            )}
            <Paginator currentPage={page} totalPages={lastPage} setCurrentPage={setPage}/>
        </div>
    );
};

export default Anime;
