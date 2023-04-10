import React, {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {filterCollection} from "../../HHHPage";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import Loader from "../../../components/Loader";
import Paginator from "../../../components/UI/Paginator";
import {useGetAllMangaQuery} from "../../../services/Collections/MangaService";


const HMangaPage = () => {
  const filter = useOutletContext();
  const passkey = localStorage.getItem("passkey");
  const [page, setPage] = useState(1);
  const {data, isLoading, error, isFetching, refetch} = useGetAllMangaQuery({passkey, page});
  const filteredCollection = filterCollection(data, filter);
  if (isLoading) return <Loader/>;
  return (
    <div className={"block--dark flex flex-col gap-4"}>
      {!isFetching ? filteredCollection?.map(collectionItem =>
        <HCollectionCard key={collectionItem.id}
                         addTag={() => {
                         }}
                         removeTag={() => {
                         }}
                         link
                         collection={collectionItem}/>
      ) : <Loader/>}
      <Paginator currentPage={data.current_page}
                 totalPages={data.last_page}
                 setCurrentPage={setPage}
                 handler={refetch}/>
    </div>
  );
};

export default HMangaPage;
