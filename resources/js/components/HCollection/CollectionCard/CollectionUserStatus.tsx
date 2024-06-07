import React, {FC} from 'react';
import Image from "components/HCollection/CollectionCard/Image";
import CollectionScore from "components/HCollection/CollectionCard/CollectionScore";
import CollectionStatus from "components/HCollection/CollectionCard/CollectionStatus";
import {FaMinus, FaPlus} from "react-icons/fa";
import {ICollection} from "types/types";
import {useSetWatchedEpisodeMutation} from "services/Collections/AnimeService";

interface CollectionUserStatusProps {
    link: boolean
    path: string
    collection: ICollection
}

const CollectionUserStatus: FC<CollectionUserStatusProps> = ({link, path, collection}) => {
    const [updateWatchedEpisode] = useSetWatchedEpisodeMutation()
    return (
        <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
            <Image link={link} path={path} image={collection.image}/>
            <CollectionScore score={collection.userScore} collectionId={collection.id}/>
            <CollectionStatus type={collection.type} status={collection.status} animeID={collection.id}/>
            <div className={'flex justify-between gap-2 items-center'}>
                <span>Просмотрено:</span>
                {
                    !!collection.watchedEpisodes &&
                    <span className={'cursor-pointer'}
                          onClick={() => (updateWatchedEpisode({
                              id: collection.id,
                              plusOrMinus: 'minus'
                          }))}><FaMinus
                        className={'leading-5 transition hover:scale-[115%] hover:fill-green-400'}/></span>
                }
                <span>{collection.watchedEpisodes} / {collection.episodes_total}</span>
                {
                    !(collection.watchedEpisodes === collection.episodes_total) &&
                    <span className={'cursor-pointer'} onClick={() => (updateWatchedEpisode({
                        id: collection.id,
                        plusOrMinus: 'plus'
                    }))}
                    >
                        <FaPlus className={'leading-5 transition hover:scale-[115%] hover:fill-green-400'}/>
                    </span>
                }
            </div>
        </div>
    );
};

export default CollectionUserStatus;
