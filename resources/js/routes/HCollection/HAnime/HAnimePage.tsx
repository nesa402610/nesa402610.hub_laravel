import React, {FC, useState} from "react";
import Loader from "../../../components/Loader";
import Paginator from "../../../components/UI/Paginator";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {useGetAllAnimeQuery} from "../../../services/Collections/AnimeService";
import {useAppSelector} from "../../../hooks/redux";


// interface HAnimePageProps {
//   filteredCollection?: ICollection[];
//   setCollections?: Dispatch<any>;
//   setError?(data: {}): any
// }

const HAnimePage: FC = () => {
    const {filter} = useAppSelector(state => state.collection)
    const passkey = localStorage.getItem("passkey");
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching} = useGetAllAnimeQuery({
        passkey,
        page,
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
                    <HCollectionCard key={collectionItem.id}
                                     hover link
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
export default HAnimePage;
