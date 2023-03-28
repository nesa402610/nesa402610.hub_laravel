import React, {FC} from "react";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import {useGetAllAnimeQuery} from "../../services/HCollectionService";
import Loader from "../../components/Loader";
import {useOutletContext} from "react-router-dom";
import {filterCollection} from "../HHHPage";


// interface HAnimePageProps {
//   filteredCollection?: ICollection[];
//   setCollections?: Dispatch<any>;
//   setError?(data: {}): any
// }

const HAnimePage: FC = () => {
  const filter = useOutletContext();
  const passkey = localStorage.getItem("passkey");
  const {data, isLoading, error} = useGetAllAnimeQuery({passkey});
  const filteredCollection = filterCollection(data, filter);
  if (isLoading) return <Loader/>;

  return (
    <div className={"block--dark flex flex-col -mx-4 gap-4 p-0"}>
      {filteredCollection?.map(collectionItem =>
        <HCollectionCard key={collectionItem.id}
                         collection={collectionItem}/>
      )}
    </div>
  );
};

export default HAnimePage;
