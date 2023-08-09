import React from 'react';
import HCollectionTags from "./../HCollectionTags";
import {ICollection} from "../../../../types/types";
import InfoField from "./InfoField";

const CollectionInfo = ({collection}: { collection: ICollection }) => {
    return (
        <div className={"text-neutral-300"}>
            <h3 className={"mt-4 font-bold"}>Информация</h3>
            <div className={"flex flex-col"}>
                <InfoField title={'Дата'} value={collection.announce_date.slice(0, 4)}/>
                <HCollectionTags collection={collection} tags={collection.tags}
                                 collectionID={collection.id}/>
                <InfoField title={'Эпизоды: '}>
                    {collection.episodes_total ?
                        `${collection.episodes_released} / ${collection.episodes_total}
                         ${collection.videosCount ? collection.videosCount + ' добавлено' : ''}`
                        : 0
                    }
                </InfoField>
                <InfoField title={'Длительность серии:'} value={`${collection.episode_time} мин.`}/>
                <InfoField title={'Студия:'} value={collection.studios.map(studio => studio.name)}/>
                <InfoField title={'Цензура:'} value={collection.censure ? "С цензурой" : "Без цензуры"}/>
                <InfoField title={'Рейтинг:'} value={collection.rating}/>
            </div>

        </div>
    );
};

export default CollectionInfo;
