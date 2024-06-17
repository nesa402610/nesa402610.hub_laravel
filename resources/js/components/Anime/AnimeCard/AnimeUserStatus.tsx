import React, {FC} from 'react';
import Image from "components/Anime/AnimeCard/Image";
import AnimeScore from "components/Anime/AnimeCard/AnimeScore";
import AnimeStatus from "components/Anime/AnimeCard/AnimeStatus";
import {FaMinus, FaPlus} from "react-icons/fa";
import {ICollection} from "types/types";
import {AnimeAPI, useSetWatchedEpisodeMutation} from "services/Anime/AnimeService";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useSearchParams} from "react-router-dom";
import {useGetUserQuery} from "services/userService";

interface CollectionUserStatusProps {
    link: boolean
    path: string
    anime: ICollection
}

const AnimeUserStatus: FC<CollectionUserStatusProps> = ({link, path, anime}) => {
    const [updateWatchedEpisode] = useSetWatchedEpisodeMutation()
    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const {data: user} = useGetUserQuery();
    const updateEpisodesHandle = (plusOrMinus: 'plus' | 'minus') => {
        updateWatchedEpisode({
            id: anime.id,
            plusOrMinus
        }).unwrap()
            .then((r: any) => {
                dispatch(
                    AnimeAPI.util.updateQueryData('getAllAnime', {
                        page: +params.get('page') || 1,
                        query: filter,
                    }, (draft) => {
                        const anim = draft.data.find(a => a.id === anime.id);
                        if (anim) {
                            Object.assign(anim, r)
                        }
                    }),
                )
                dispatch(
                    AnimeAPI.util.updateQueryData('getUserAnimeList', {
                        userId: String(user.id), animestatus: window.location.pathname.split('/')[4]
                    }, (draft) => {
                        const anime = draft.find((anime) => anime.id === anime.id);
                        if (anime) {
                            Object.assign(anime, r)

                        }
                    }),
                )
            })


    }
    return (
        <div className={'flex-shrink-0 basis-auto flex flex-col gap-2'}>
            <Image link={link} path={path} image={anime.image}/>
            <AnimeScore score={anime.userStatus?.score || 0} animeId={anime.id}/>
            <AnimeStatus status={anime.userStatus?.status} animeID={anime.id}/>
            <div className={'flex gap-2 items-center justify-between w-[230px]'}>
                <span>Просмотрено:</span>

                <div className={'flex items-center gap-2 whitespace-nowrap'}>
                    {
                        !!anime.userStatus?.watched_episodes &&
                        <span className={'cursor-pointer'}
                              onClick={() => (updateEpisodesHandle('minus'))}><FaMinus
                            className={'leading-5 transition hover:scale-[115%] hover:fill-green-400'}/></span>
                    }
                    <span
                        className={'w-12 text-center'}>{anime.userStatus?.watched_episodes || 0} / {anime.episodes_total}</span>
                    {
                        (anime?.userStatus?.watched_episodes < anime.episodes_total || !anime.userStatus?.watched_episodes) &&
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
