import React, {FC, useState} from "react";
import Loader from "components/Loader";
import Paginator from "components/UI/Paginator";
import {useGetAllAnimeQuery} from "services/Collections/AnimeService";
import {useAppSelector} from "hooks/redux";
import AnimeCard from "components/Anime/AnimeCard/AnimeCard";
import {useSearchParams} from "react-router-dom";

const AnimeList: FC = () => {
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const [page, setPage] = useState(params.get('page') || 1);
    const {data, isLoading, isFetching} = useGetAllAnimeQuery({
        page: +page,
        query: filter
    });

    if (isLoading) return <Loader/>;

    return (
        <div className={"block--dark flex flex-col gap-4"}>
            {!data?.data?.length &&
                <h2 className={'text-center font-bold text-lg'}>
                    Кажется, по этому запросу еще ничего нет
                </h2>
            }
            <div className={'relative flex flex-col gap-4 min-h-[100px]'}>
                {isFetching &&
                    <div className={'z-40 absolute rounded-lg bg-neutral-700/70 h-full w-full'}>
                        <Loader center/>
                    </div>
                }
                {data?.data?.map(collectionItem =>
                    <AnimeCard key={collectionItem.id}
                               link
                               collection={collectionItem}/>
                )}
            </div>
            <Paginator currentPage={data?.current_page}
                       totalPages={data?.last_page}
                       setCurrentPage={setPage}
            />
        </div>
    );
};
export default AnimeList;
