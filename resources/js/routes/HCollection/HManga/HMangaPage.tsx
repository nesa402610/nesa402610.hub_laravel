import React, {useState} from "react";
import Loader from "../../../components/Loader";
import Paginator from "../../../components/UI/Paginator";
import {useGetAllMangaQuery} from "services/Collections/MangaService";
import {filterCollection} from "../../HHHPage";
import {useAppSelector} from "hooks/redux";
import HCollectionCard from "../../../components/HCollection/CollectionCard/HCollectionCard";


const HMangaPage = () => {
    const {filter} = useAppSelector(state => state.collection)
    const passkey = localStorage.getItem("passkey");
    const [page, setPage] = useState(1);
    const {data, isLoading, isFetching} = useGetAllMangaQuery({passkey, page});
    const filteredCollection = filterCollection(data, filter);
    if (isLoading) return <Loader/>;
    return (
        <div className={"block--dark flex flex-col gap-4"}>
            {!isFetching ? filteredCollection?.map(collectionItem =>
                <HCollectionCard key={collectionItem.id} link collection={collectionItem}/>
            ) : <Loader/>}
            <Paginator currentPage={data.current_page}
                       totalPages={data.last_page}
                       setCurrentPage={setPage}/>
        </div>
    );
};

export default HMangaPage;
