import React, {FC, useState} from 'react';
import {useSetAnimeStatusMutation} from "../../services/Collections/AnimeService";
import {useGetUserQuery} from "../../services/userService";
import {GrClose} from "react-icons/gr";

interface CollectionStatusProps {
    status: number
    animeID: number
}

const CollectionStatus: FC<CollectionStatusProps> = ({status, animeID}) => {
    const {data: user} = useGetUserQuery();

    const [setStatus] = useSetAnimeStatusMutation()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const statuses = [
        {status: 6, name: 'Просмотрено', color: 'bg-green-600', hover: 'hover:bg-green-600'},
        {status: 1, name: 'Смотрю', color: 'bg-blue-600', hover: 'hover:bg-blue-600'},
        {status: 2, name: 'Буду смотреть', color: 'bg-purple-600', hover: 'hover:bg-purple-600'},
        {status: 3, name: 'Пересматриваю', color: 'bg-blue-600', hover: 'hover:bg-blue-600'},
        {status: 0, name: 'Брошено', color: 'bg-red-600', hover: 'hover:bg-red-600'},
        {status: 4, name: 'Не буду смотреть', color: 'bg-red-700', hover: 'hover:bg-red-700'},
        {status: 5, name: 'Фу, какая гадость', color: 'bg-red-700', hover: 'hover:bg-red-700'},
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
        <div className={'relative cursor-pointer'}>
            <div className={'relative flex items-center'} onClick={() => setIsOpen(true)}>
                {isOpen &&
                    <div className={'absolute right-2 z-[1000]'}
                         onClick={e => {
                             e.stopPropagation();
                             setIsOpen(false)
                         }}>
                        <GrClose color={'white'}/>
                    </div>
                }
                {!status && status !== 0 ?
                    <div className={`bg-neutral-800 transition-all rounded-lg p-2 w-full`}>Добавить в список</div>
                    :
                    statuses.map((s, index) =>
                        s.status === status &&
                        <div className={`${s.color} hover:brightness-110 transition-all rounded-lg p-2 w-full`}
                             key={index}>{s.name}</div>
                    )
                }
            </div>
            {isOpen &&
                <div className={'absolute top-0 z-50 left-0 bg-neutral-800 flex flex-col gap-2 rounded-lg w-full'}>
                    {statuses.map(({status: stat, name, color, hover}) =>
                        <span key={name}
                              className={`flex-1 cursor-pointer rounded-lg p-2 transition-all ${stat === status ? `${color}` : `${hover}`}`}
                              onClick={() => setStatusHandler(stat)}>{name}</span>
                    )}
                </div>
            }
        </div>
    );
};

export default CollectionStatus;
