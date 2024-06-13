import React, {FC} from 'react';
import Image from "components/Anime/AnimeCard/Image";
import AnimeScore from "components/Anime/AnimeCard/AnimeScore";
import AnimeStatus from "components/Anime/AnimeCard/AnimeStatus";
import {FaMinus, FaPlus} from "react-icons/fa";
import {ICollection} from "types/types";
import {AnimeAPI, useSetWatchedEpisodeMutation} from "services/Collections/AnimeService";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useSearchParams} from "react-router-dom";
import {useGetUserQuery} from "services/userService";

interface CollectionUserStatusProps {
    link: boolean
    path: string
    collection: ICollection
}

const AnimeUserStatus: FC<CollectionUserStatusProps> = ({link, path, collection}) => {
    const [updateWatchedEpisode] = useSetWatchedEpisodeMutation()
    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const {data: user} = useGetUserQuery();
    const updateEpisodesHandle = (plusOrMinus: 'plus' | 'minus') => {
        updateWatchedEpisode({
            id: collection.id,
            plusOrMinus
        }).unwrap()
            .then((r: any) => {
                dispatch(
                    AnimeAPI.util.updateQueryData('getAllAnime', {
                        page: +params.get('page') || 1,
                        query: filter,
                        passkey: null
                    }, (draft) => {
                        const anime = draft.data.find(a => a.id === collection.id);
                        if (anime) {
                            Object.assign(anime, r)
                        }
                    }),
                )
                dispatch(
                    AnimeAPI.util.updateQueryData('getUserAnimeList', {
                        userId: String(user.id), animestatus: window.location.pathname.split('/')[4]
                    }, (draft) => {
                        const anime = draft.find((anime) => anime.id === collection.id);
                        if (anime) {
                            anime.userStatus.status = r.userStatus.status
                            anime.userStatus.watched_episodes = r.userStatus.watched_episodes
                        }
                    }),
                )
            })


    }
    return (
        <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
            <Image link={link} path={path} image={collection.image}/>
            <AnimeScore score={collection.userStatus?.score || 0} collectionId={collection.id}/>
            <AnimeStatus status={collection.userStatus?.status} animeID={collection.id}/>
            <div className={'flex gap-2 items-center justify-between w-[230px]'}>
                <span>Просмотрено:</span>

                <div className={'flex items-center gap-2 whitespace-nowrap'}>
                    {
                        !!collection.userStatus?.watched_episodes &&
                        <span className={'cursor-pointer'}
                              onClick={() => (updateEpisodesHandle('minus'))}><FaMinus
                            className={'leading-5 transition hover:scale-[115%] hover:fill-green-400'}/></span>
                    }
                    <span
                        className={'w-12 text-center'}>{collection.userStatus?.watched_episodes || 0} / {collection.episodes_total}</span>
                    {
                        collection.userStatus?.watched_episodes < collection.episodes_total &&
                        <span className={'cursor-pointer'} onClick={() => updateEpisodesHandle('plus')}
                        >
                        <FaPlus className={'leading-5 transition hover:scale-[115%] hover:fill-green-400'}/>
                    </span>
                    }
                </div>
            </div>
        </div>
    );
};

export default AnimeUserStatus;
