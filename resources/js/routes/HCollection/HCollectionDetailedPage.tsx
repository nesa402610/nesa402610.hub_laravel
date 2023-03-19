import React from 'react';
import {useParams} from "react-router";
import {useGetCollectionByIdQuery} from "../../services/HCollectionService";
import Collection from "../../components/collection/Collection";

const HCollectionDetailedPage = () => {
  const {id} = useParams()

  const {data: collection} = useGetCollectionByIdQuery({passkey: localStorage.getItem('passkey'), id})
  console.log(collection)
  console.log(id)
  return (
    <div className={'m-4'}>
      <Collection collection={collection}/>
    </div>
  );
};

export default HCollectionDetailedPage;
