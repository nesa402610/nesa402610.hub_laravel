import React, {useState} from 'react';
import {useSetAnimeStatusMutation} from "../../services/Collections/AnimeService";
import {useGetUserQuery} from "../../services/userService";

const CollectionStatus = ({status, animeID}) => {
    const {data: user} = useGetUserQuery();


    const [setStatus, {}] = useSetAnimeStatusMutation()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const statuses = [
        {status: 6, name: 'Просмотрено'},
        {status: 1, name: 'Смотрю'},
        {status: 2, name: 'Буду смотреть'},
        {status: 3, name: 'Пересматриваю'},
        {status: 0, name: 'Брошено'},
        {status: 4, name: 'Не буду смотреть'},
        {status: 5, name: 'Фу, какая гадость'},
    ]
    const setStatusHandler = (stat: number) => {
        if (stat === status) {
            return setIsOpen(false)
        }
        setStatus({status: stat, animeID})
            .unwrap()
            .catch(err => console.error(err))
            .finally(() => setIsOpen(false))
    }
    if (!user) return null;
    return (
        <div className={'flex bg-neutral-800 hover:bg-neutral-900 relative rounded-lg transition-all cursor-pointer'}>
            <div className={'p-2 w-full'} onClick={() => setIsOpen(true)}>
                {!status && status !== 0 &&
                    <span>Добавить в список</span>
                }
                {statuses.map((s, index) =>
                    <span key={index}>{status === s.status && s.name}</span>
                )}
            </div>
            {isOpen &&
                <div className={'absolute top-0 z-50 left-0 bg-neutral-800 flex flex-col rounded-lg w-full'}>
                    {statuses.map(({status: stat, name}) =>
                        <span
                            className={`flex-1 cursor-pointer rounded-lg p-2 transition-all ${stat === status ? 'bg-indigo-900' : 'hover:bg-neutral-900'}`}
                            onClick={() => setStatusHandler(stat)}>{name}</span>
                    )}
                </div>
            }
        </div>
    );
};

export default CollectionStatus;
