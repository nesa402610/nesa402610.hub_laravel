import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useGetUserAnimeOverviewQuery} from "services/Anime/AnimeService";
import Loader from "../../Loader";

interface UserAnimeOverviewProps {
    userId: string
}

const UserAnimeOverview: FC<UserAnimeOverviewProps> = ({userId}) => {
    const {data: animeData, isLoading} = useGetUserAnimeOverviewQuery(userId)

    if (isLoading) return <Loader text={'Смотрим, что там по аниме...'}/>
    const watchedPercent = +(animeData.watched / animeData.count * 100).toFixed(0) || 50
    const unwatchedPercent = (100 - +watchedPercent) || 50

    return (
        <div className="block--light flex flex-col gap-2">
            <Link to={`animelist/watching`}
                  className={'text-lg font-bold hover:text-neutral-300 transition-all'}>Список аниме</Link>
            {/*{animeList.map(i => <span>{i.animeList.}</span>)}*/}
            <div className={'flex rounded-lg overflow-hidden'}>
                <div className={'bg-neutral-600 flex justify-center items-center'}
                     style={{width: watchedPercent + '%'}}>
                    <span>{animeData.watched}</span>
                </div>
                <div className={'bg-neutral-800 flex justify-center items-center'}
                     style={{width: unwatchedPercent + '%'}}>
                    <span>{animeData.unwatched}</span>
                </div>
            </div>
            <div className={'flex gap-2 xs:flex-wrap'}>
                <Link to={'animelist/planned'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Запланировано {animeData.planned}</Link>
                <Link to={'animelist/watched'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Просмотрено {animeData.watched}</Link>
                <Link to={'animelist/watching'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Смотрю {animeData.watching}</Link>
                <Link to={'animelist/dropped'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Брошено {animeData.dropped}</Link>
                <Link to={'animelist/out'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Не буду
                    смотреть {animeData.out}</Link>
                <Link to={'animelist/fuckout'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Фу, какая
                    гадость {animeData.fuckout}</Link>
            </div>
        </div>
    );
};

export default UserAnimeOverview;
