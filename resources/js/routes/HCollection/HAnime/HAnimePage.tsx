import React, {FC, useState} from "react";
import Loader from "../../../components/Loader";
import Paginator from "../../../components/UI/Paginator";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {
    useAddTagToAnimeMutation,
    useGetAllAnimeQuery,
    useRemoveTagMutation
} from "../../../services/Collections/AnimeService";
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
    const {data, isLoading, isFetching} = useGetAllAnimeQuery({passkey, page, query: filter});
    const [addTag] = useAddTagToAnimeMutation();
    const [removeTag] = useRemoveTagMutation();
    if (isLoading) return <Loader/>;

    return (
        <div className={"block--dark flex flex-col  gap-4"}>
            {!data.data.length &&
                <h2 className={'text-center font-bold text-lg'}>
                    Кажется, по этому запросу еще ничего нет
                </h2>
            }
            {!isFetching ? data.data?.map(collectionItem =>
                <HCollectionCard removeTag={removeTag} addTag={addTag} key={collectionItem.id}
                                 hover link
                                 collection={collectionItem}/>
            ) : <Loader/>}
            <Paginator currentPage={data.current_page}
                       totalPages={data.last_page}
                       setCurrentPage={setPage}
            />
        </div>
    );
};
export default HAnimePage;
