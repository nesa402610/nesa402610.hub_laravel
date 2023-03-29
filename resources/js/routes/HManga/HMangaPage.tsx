import React, {useState} from "react";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import {useGetAllMangaQuery} from "../../services/HCollectionService";
import Loader from "../../components/Loader";
import {useOutletContext} from "react-router-dom";
import {filterCollection} from "../HHHPage";
import Paginator from "../../components/UI/Paginator";

const HMangaPage = () => {
  const filter = useOutletContext();
  const passkey = localStorage.getItem("passkey");
  const [page, setPage] = useState(1);
  const {data, isLoading, error, isFetching, refetch} = useGetAllMangaQuery({passkey, page});
  const filteredCollection = filterCollection(data, filter);
  if (isLoading) return <Loader/>;
  return (
    <div className={"block--dark flex flex-col -mx-4 gap-4"}>
      {!isFetching ? filteredCollection?.map(collectionItem =>
        <HCollectionCard key={collectionItem.id}
                         collection={collectionItem}/>
      ) : <Loader/>}
      <Paginator currentPage={data.collections.current_page}
                 totalPages={data.collections.last_page}
                 setCurrentPage={setPage}
                 handler={refetch}/>
    </div>
  );
};

export default HMangaPage;
