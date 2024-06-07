import React from 'react';
import HCollectionGenres from "./HCollectionGenres";
import {ICollection} from "types/types";
import InfoField from "./InfoField";
import Bauble from "components/UI/Bauble";

export enum collectionKind {
    TV = 'ТВ',
    SPECIAL = 'Спешл',
    MUSIC = 'Клип',
    MOVIE = 'Фильм',
    OVA = 'OVA',
    ONA = 'ONA'
}

const CollectionInfo = ({collection}: { collection: ICollection }) => {
    let colKind = collection.kind.toUpperCase()
    colKind = collectionKind[colKind]
    return (
        <div className={"text-neutral-300 flex gap-4 justify-between"}>
            <div>
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
            <div className={'flex flex-col p-4 gap-2 min-w-[10rem]'}>
                <h2 className={'font-bold text-lg uppercase text-center'}>Рейтинг</h2>
                <Bauble className={'w-36 flex justify-between'}>
                    <span>Шикимори</span>
                    <span>{collection.shiki_score || '-'}</span>
                </Bauble>
                <Bauble className={'w-36 flex justify-between'}>
                    <span>hub.n/esa</span>
                    <span>{collection.score}</span></Bauble>
            </div>

        </div>
    );
};

export default CollectionInfo;
