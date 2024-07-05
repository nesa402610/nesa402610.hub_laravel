import React, {FC, useState} from "react";
import Loader from "components/Loader";
import Paginator from "components/UI/Paginator";
import {useGetAllAnimeQuery} from "services/Anime/AnimeService";
import {useAppSelector} from "hooks/redux";
import AnimeCard from "components/Anime/AnimeCard/AnimeCard";
import {useSearchParams} from "react-router-dom";
import AnimeCard_mini from "components/Anime/AnimeCard/AnimeCard_mini";

interface AnimeListProps {
    smallPreview?: boolean
}

const AnimeList: FC<AnimeListProps> = ({smallPreview = false}) => {
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const [page, setPage] = useState(params.get('page') || 1);
    const {data, isLoading, isFetching} = useGetAllAnimeQuery({
        page: +page,
        query: filter
    });

    if (isLoading) return <Loader/>;
    console.log(smallPreview)

    return (
        <div className={"block--dark !p-0 flex flex-col gap-4 flex-1"}>
            {!data?.data?.length &&
                <h2 className={'text-center font-bold text-lg'}>
                    Кажется, по этому запросу еще ничего нет
                </h2>
            }
            <div
                className={`relative  gap-4 min-h-[100px] ${smallPreview ? 'grid xs:grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'flex flex-col'}`}>
                {isFetching &&
                    <div className={'z-40 absolute rounded-lg bg-neutral-700/70 h-full w-full'}>
                        <Loader center/>
                    </div>
                }
                {data?.data?.map(collectionItem =>
                    !smallPreview ?
                        <AnimeCard key={collectionItem.id}
                                   link
                                   collection={collectionItem}/>
                        :
                        <AnimeCard_mini key={collectionItem.id} anime={collectionItem} className={'!bg-neutral-700'}/>

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
