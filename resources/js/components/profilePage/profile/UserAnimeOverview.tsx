import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {useGetUserAnimeOverviewQuery} from "../../../services/Collections/AnimeService";
import Loader from "../../Loader";

interface UserAnimeOverviewProps {
    userId: string
}

const UserAnimeOverview: FC<UserAnimeOverviewProps> = ({userId}) => {
    const {data: animeData, isLoading} = useGetUserAnimeOverviewQuery(userId)

    if (isLoading) return <Loader text={'Смотрим, что там по аниме...'}/>
    const watchedPercent = (animeData.watched / animeData.count * 100).toFixed(0)
    const unwatchedPercent = (100 - +watchedPercent)

    return (
        <div className="block--light flex flex-col gap-2">
            <Link to={userId + '/animelist/watching'}
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
                <Link to={userId + '/animelist/planned'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Запланировано {animeData.planned}</Link>
                <Link to={userId + '/animelist/watched'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Просмотрено {animeData.watched}</Link>
                <Link to={userId + '/animelist/watching'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Смотрю {animeData.watching}</Link>
                <Link to={userId + '/animelist/dropped'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Брошено {animeData.dropped}</Link>
                <Link to={userId + '/animelist/dropped'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Не буду
                    смотреть {animeData.out}</Link>
                <Link to={userId + '/animelist/dropped'}
                      className={'transition-all hover:text-neutral-300 text-sm'}>Фу, какая
                    гадость {animeData.fuckout}</Link>
            </div>
        </div>
    );
};

export default UserAnimeOverview;
