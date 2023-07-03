import React, {FC, useState} from "react";
import {useGetUserQuery} from "../../services/userService";
import TagSelector from "./TagSelector";
import HCollectionTags from "./HCollectionTags";
import {Link} from "react-router-dom";
import {IAnime} from "../../types/Anime";
import Title from "./Title";
import CollectionStatus from "./CollectionStatus";


interface CollectionProps {
    collection: IAnime;
    hover?: boolean;
    link?: boolean;

    addTag({titleId, tagId}): any;

    removeTag(titleId, tagId): any;
}

const HCollectionCard: FC<CollectionProps> = ({collection, link = false, hover, addTag, removeTag}) => {
    const {data: user} = useGetUserQuery();
    const [tagDropDown, setTagDropDown] = useState(false);
    if (!collection) return null;
    return (
        <div className={"bg-neutral-700 p-4 rounded-lg"}>
            <div className={"flex xs:flex-col md:flex-row gap-4"}>
                <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
                    <Link className={'flex justify-center'}
                          to={`${link ? collection.id : ""}`}>
                        <img
                            className={"rounded-lg w-[200px] h-auto" + (hover ? " hover:scale-105 transition-all" : "cursor-default")}
                            src={collection.image}
                            alt="Изображение тайтла"/>
                    </Link>
                    {user && <CollectionStatus status={collection.status} animeID={collection.id}/>}
                </div>
                <div className={"flex flex-col"}>
                    <div className={'flex flex-col'}>
                        {link ? <Title collection={collection} hover link/> : <Title collection={collection}/>}
                        <span className={'text-sm italic text-neutral-400'}>{collection.title_en}</span>
                    </div>
                    <div className={"text-neutral-300"}>
                        <h3 className={"mt-4 font-bold"}>Информация</h3>
                        <div className={"flex flex-col"}>
                            <span>Год выхода: {collection.announce_date.slice(0, 4)}</span>
                            <span className={"flex gap-1 md:flex-nowrap xs:flex-wrap"}>Жанры:
                    <div className={"flex gap-1 flex-wrap"}>
                      <HCollectionTags removeTag={removeTag} collection={collection}/>
                        {user?.role[0].name === 'Admin' &&
                            <div onClick={() => setTagDropDown(prev => !prev)}
                                 className={"bg-neutral-800 px-2 rounded-full relative"}>
                                +
                                {tagDropDown &&
                                    <TagSelector addTag={addTag} collection={collection}/>
                                }
                            </div>
                        }
                    </div>
                  </span>
                            {collection.episodes_released && <div className={"flex items-center"}>
                                <h4>Эпизоды:&nbsp;</h4>
                                <span>{collection.episodes_released}</span>
                                /
                                <span>
                                    {collection.episodes_total === 0 ? '?' : collection.episodes_total}
                                </span>
                            </div>}
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
