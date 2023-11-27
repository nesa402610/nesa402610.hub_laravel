import React from 'react';
import HCollectionGenres from "./HCollectionGenres";
import {ICollection} from "types/types";
import InfoField from "./InfoField";

enum kind {
    TV = 'ТВ',
    SPECIAL = 'Спешл',
    MUSIC = 'Клип',
    MOVIE = 'Фильм',
    OVA = 'OVA'

}

const CollectionInfo = ({collection}: { collection: ICollection }) => {
    let colKind = collection.kind.toUpperCase()
    colKind = kind[colKind]
    return (
        <div className={"text-neutral-300"}>
            <h3 className={"mt-4 font-bold"}>Информация</h3>
            <div className={"flex flex-col"}>
                <InfoField title={'Дата: '} value={collection.announce_date.slice(0, 4)}/>
                <InfoField title={'Тип: '} value={colKind}/>
                <HCollectionGenres genres={collection.genres}
                                   collectionID={collection.id}/>
                <InfoField title={'Эпизоды: '}>
                    {collection.episodes_total ?
                        `${collection.episodes_released} / ${collection.episodes_total}
                         ${collection.videosCount ? `${collection.videosCount} добавлено)` : ''}`
                        : 0
                    }
                </InfoField>
                <InfoField title={'Длительность серии:'} value={`${collection.episode_time} мин.`}/>
                <InfoField title={'Студия:'} value={collection.studios?.map(studio => studio.name)}/>
                <InfoField title={'Цензура:'} hidden={collection.rating !== 'Rx'}>
                    {collection.censure ? "С цензурой" : "Без цензуры"}
                </InfoField>
                <InfoField title={'Рейтинг:'} value={collection.rating}/>
            </div>

        </div>
    );
};

export default CollectionInfo;
