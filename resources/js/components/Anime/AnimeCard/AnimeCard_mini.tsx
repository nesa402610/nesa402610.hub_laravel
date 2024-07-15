import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {collectionKind} from "components/Anime/AnimeCard/AnimeInfo/AnimeInfo";
import {ICollection} from "types/types";
import AnimeUserStatus from "components/Anime/AnimeCard/AnimeUserStatus";

interface AnimeCard_miniProps {
    anime: ICollection
    className?: string
    hideStatus?: boolean
}

// @ts-ignore
enum AnimeStatus {
    'bg-red-600' = 0 | 4 | 5,
    'bg-blue-600' = 1 | 3,
    'bg-purple-600' = 2,
    'bg-green-600' = 6,
    'bg-neutral-700' = undefined
}


const AnimeCard_mini: FC<AnimeCard_miniProps> = ({anime, className, hideStatus}) => {
    const kind = collectionKind[anime.kind?.toUpperCase()] || 'Не указан'
    return (
        <Link to={`/NULL/unit/ZERO/${anime.id}`}
              className={`${AnimeStatus[anime.userStatus?.status]} p-4 rounded-xl min-h-[200px] flex flex-col ${className}`}>
            <img src={anime.image} className={'object-cover rounded-lg max-h-[250px] flex-1'} alt=""/>
            <h3 className={'whitespace-nowrap overflow-hidden overflow-ellipsis'}>{anime.title_ru || anime.title_original}</h3>
            <span className={'text-neutral-300 text-sm'}>{kind}</span>
            {!hideStatus && <AnimeUserStatus anime={anime}/>}
        </Link>
    );
};

export default AnimeCard_mini;
