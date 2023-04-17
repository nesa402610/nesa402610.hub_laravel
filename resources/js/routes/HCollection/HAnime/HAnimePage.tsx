import React, {FC, useState} from "react";
import {useOutletContext} from "react-router-dom";
import Loader from "../../../components/Loader";
import {filterCollection} from "../../HHHPage";
import Paginator from "../../../components/UI/Paginator";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {
  useAddTagToAnimeMutation,
  useGetAllAnimeQuery,
  useRemoveTagMutation
} from "../../../services/Collections/AnimeService";


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
  const [addTag] = useAddTagToAnimeMutation();
  const [removeTag] = useRemoveTagMutation();
  if (isLoading) return <Loader/>;
  const filteredCollection = filterCollection(data, filter);
  return (
    <div className={"block--dark flex flex-col  gap-4"}>
      {!isLoading ? filteredCollection?.map(collectionItem =>
        <HCollectionCard removeTag={removeTag} addTag={addTag} key={collectionItem.id}
                         hover link
                         collection={collectionItem}/>
      ) : <Loader/>}
      <Paginator currentPage={data.current_page}
                 totalPages={data.last_page}
                 setCurrentPage={setPage}
                 handler={refetch}/>
    </div>
  );
};
export default HAnimePage;