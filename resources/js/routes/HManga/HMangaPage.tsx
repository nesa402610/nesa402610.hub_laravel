import React from "react";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import {useGetAllMangaQuery} from "../../services/HCollectionService";
import Loader from "../../components/Loader";
import {useOutletContext} from "react-router-dom";
import {filterCollection} from "../HHHPage";

const HMangaPage = () => {
  const filter = useOutletContext()
  const passkey = localStorage.getItem("passkey");
  const {data, isLoading, error} = useGetAllMangaQuery({passkey});
  const filteredCollection = filterCollection(data, filter)
  if (isLoading) return <Loader/>;
  return (
    <div className={"block--dark flex flex-col -mx-4 gap-4"}>
      {filteredCollection?.map(collectionItem =>
        <HCollectionCard key={collectionItem.id}
                         collection={collectionItem}/>
      )}
    </div>
  );
};

export default HMangaPage;
