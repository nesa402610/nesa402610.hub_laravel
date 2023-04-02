import React, {FC, useState} from "react";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import {useGetAllAnimeQuery} from "../../services/HCollectionService";
import Loader from "../../components/Loader";
import {useOutletContext} from "react-router-dom";
import {filterCollection} from "../HHHPage";
import Paginator from "../../components/UI/Paginator";


// interface HAnimePageProps {
//   filteredCollection?: ICollection[];
//   setCollections?: Dispatch<any>;
//   setError?(data: {}): any
// }

const HAnimePage: FC = () => {
  const filter = useOutletContext();
  const passkey = localStorage.getItem("passkey");
  const [page, setPage] = useState(1);
  const {data, isLoading, refetch} = useGetAllAnimeQuery({passkey, page});
  if (isLoading) return <Loader/>;
  const filteredCollection = filterCollection(data, filter);
  return (
    <div className={"block--dark flex flex-col  gap-4"}>
      {!isLoading ? filteredCollection?.map(collectionItem =>
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
export default HAnimePage;
