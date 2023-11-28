import React from 'react';
import {Link} from "react-router-dom";
import {collectionKind} from "components/HCollection/CollectionCard/CollectionInfo/CollectionInfo";

const HCollectionCardMini = ({anime}) => {
    const kind = collectionKind[anime.kind.toUpperCase()]
    return (
        <Link to={`/NULL/unit/ZERO/${anime.id}`} className={'min-h-[200px] flex flex-col'}>
            <img src={anime.image} className={'rounded-lg max-h-[250px] object-cover flex-1'} alt=""/>
            <h3 className={'whitespace-nowrap overflow-hidden overflow-ellipsis'}>{anime.title_ru || anime.title_original}</h3>
            <span>{kind}</span>
        </Link>
    );
};

export default HCollectionCardMini;