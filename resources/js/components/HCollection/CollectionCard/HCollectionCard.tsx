import React, {FC} from "react";
import {useGetUserQuery} from "../../../services/userService";
import HCollectionTags from "./HCollectionTags";
import Title from "./Title";
import CollectionStatus from "./CollectionStatus";
import {ICollection} from "../../../types/types";
import Image from "./Image";

interface CollectionProps {
    collection: ICollection;
    link?: boolean;
    admin?: boolean

}

const HCollectionCard: FC<CollectionProps> = ({collection, link = false, admin = false}) => {
    const {data: user} = useGetUserQuery();

    const type = collection?.type === 0 ? 'ZERO' : 'ONE'

    if (!collection) return null;

    const path = admin ? `${collection.id}` : `/NULL/unit/${type}/${collection.id}`
    return (
        <div className={"bg-neutral-700 p-4 rounded-lg"}>
            <div className={"flex xs:flex-col md:flex-row gap-4"}>
                <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
                    <Image link={link} path={path} image={collection.image}/>
                    <CollectionStatus type={collection.type} status={collection.status} animeID={collection.id}/>
                </div>
                <div className={"flex flex-col"}>
                    <div className={'flex flex-col'}>
                        <Title path={path} collection={collection} link/>
                        <span className={'text-sm italic text-neutral-400'}>{collection.title_en}</span>
                    </div>
                    <div className={"text-neutral-300"}>
                        <h3 className={"mt-4 font-bold"}>Информация</h3>
                        <div className={"flex flex-col"}>
                            <span>Год выхода: {collection.announce_date.slice(0, 4)}</span>
                            <HCollectionTags collection={collection} tags={collection.tags}
                                             collectionID={collection.id}/>
                            {collection.episodes_released && <div className={"flex items-center"}>
                                <h4>Эпизоды:&nbsp;</h4>
                                <span>{collection.episodes_released}</span>
                                /
                                <span>
                                {collection.episodes_total === 0 ? '?' : collection.episodes_total} {collection.videosCount ? `(${collection.videosCount} добавлено)` : ''}
                            </span>
                            </div>
                            }
                            {collection.episode_time &&
                                <div className={"flex"}>
                                    <h4>Длительность серии:&nbsp;</h4>
                                    <span>{collection.episode_time} мин.</span>
                                </div>
                            }
                            {collection.studios &&
                                <span>
                                Студия: {collection.studios.map(studio => studio.name)}
                            </span>
                            }
                            <span>Цензура: {collection.censure ? "С цензурой" : "Без цензуры"}</span>
                            <span>Рейтинг: {collection.rating}</span>
                        </div>
                        <h3 className={"mt-4 font-bold"}>Описание</h3>
                        <p>{collection.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HCollectionCard;
