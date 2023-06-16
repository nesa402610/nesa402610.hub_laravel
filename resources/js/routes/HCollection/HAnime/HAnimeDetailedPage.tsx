import React from "react";
import {useParams} from "react-router";
import Loader from "../../../components/Loader";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import {useAddTagToAnimeMutation, useGetAnimeByIdQuery} from "../../../services/Collections/AnimeService";
import {useRemoveTagMutation} from "../../../services/Collections/MangaService";
import AnimeVideos from "../../../components/HCollection/AnimeVideos";

const HAnimeDetailedPage = () => {
  const passkey = localStorage.getItem("passkey");
  const {id} = useParams();
  const {data} = useGetAnimeByIdQuery({id, passkey});
  const [removeTag] = useRemoveTagMutation();
  const [addTag] = useAddTagToAnimeMutation();
  // const {data} = useGetAllAnimeQuery({passkey}, {
  //   selectFromResult: ({data}) => ({
  //     data: data?.collections.data.find(d => d.id == 7),
  //   })
  // })

  if (!data) return <Loader/>;
  return (
    <div className={"m-4 flex flex-col gap-4"}>
      <HCollectionCard addTag={addTag} removeTag={removeTag} collection={data}/>
      <AnimeVideos anime={data}/>
    </div>
  );
};

export default HAnimeDetailedPage;
