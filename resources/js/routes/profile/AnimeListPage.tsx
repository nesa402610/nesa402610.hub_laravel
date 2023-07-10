import React from 'react';
import {useParams} from "react-router";
import {useGetUserAnimeListQuery, useGetUserAnimeOverviewQuery} from "../../services/Collections/AnimeService";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";

const AnimeListPage = () => {
    const {animestatus, username} = useParams()
    const {data, isFetching} = useGetUserAnimeListQuery({userId: username, animestatus})
    const {data: animeOverview} = useGetUserAnimeOverviewQuery(username)
    const statusList = [
        {name: 'watched', text: 'Просмотренные', count: animeOverview?.watched},
        {name: 'watching', text: 'Сейчас смотрю', count: animeOverview?.watching},
        {name: 'planned', text: 'Запланированные', count: animeOverview?.planned},
        {name: 'rewatching', text: 'Пересматриваю', count: animeOverview?.rewatching},
        {name: 'dropped', text: 'Брошенные', count: animeOverview?.dropped},
        {name: 'out', text: 'Не буду смотреть', count: animeOverview?.out},
        {name: 'fuckout', text: 'Фу, какая гадость', count: animeOverview?.fuckout},
    ]
    return (
        <div className={'flex flex-col gap-4 p-4 relative'}>
            <div className={'grid grid-cols-4 drop-shadow-lg gap-4 justify-around bg-neutral-700 rounded-lg px-4 py-2'}>
                {statusList.map(({name, text, count}) =>
                    <Link to={`/profile/${username}/animelist/${name}`} key={name}
                          className={`${name === animestatus ? 'bg-neutral-600' : 'bg-neutral-900'} px-8 leading-8 rounded-full hover:bg-neutral-600 transition-all`}
                    >
                        {text} {count}
                    </Link>
                )}
            </div>

            {!isFetching ? data.map(anime =>
                <HCollectionCard collection={anime.anime} link hover/>
            ) : <Loader/>}
            {(!data?.length && !isFetching) &&
                <h2 className={'text-center font-bold text-2xl'}>
                    Кажется этот список пуст -_-
                </h2>
            }
        </div>
    );
};

export default AnimeListPage;
