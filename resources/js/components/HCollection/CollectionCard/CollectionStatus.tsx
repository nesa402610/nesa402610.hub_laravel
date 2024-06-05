import React, {FC} from 'react';
import {AnimeAPI, useSetAnimeStatusMutation} from "services/Collections/AnimeService";
import {useGetUserQuery} from "services/userService";
import {IoCaretDown, IoCaretUp} from "react-icons/io5";
import useClickOutside from "hooks/useClickOutside";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useSearchParams} from "react-router-dom";

interface CollectionStatusProps {
    status: number
    animeID: number
    type: number
}

const CollectionStatus: FC<CollectionStatusProps> = ({status, animeID, type}) => {
    const {data: user} = useGetUserQuery();
    const [setStatus] = useSetAnimeStatusMutation()
    const statuses = [
        {status: 6, name: `${!type ? 'Просмотрено' : 'Прочитано'}`, color: 'bg-green-600', hover: 'hover:bg-green-600'},
        {status: 1, name: 'Смотрю', color: 'bg-blue-600', hover: 'hover:bg-blue-600'},
        {
            status: 2,
            name: `${!type ? 'Буду смотреть' : 'Буду читать'}`,
            color: 'bg-purple-600',
            hover: 'hover:bg-purple-600'
        },
        {
            status: 3,
            name: `${!type ? 'Пересматриваю' : 'Перечитываю'}`,
            color: 'bg-blue-600',
            hover: 'hover:bg-blue-600'
        },
        {status: 0, name: 'Брошено', color: 'bg-red-600', hover: 'hover:bg-red-600'},
        {
            status: 4,
            name: `${!type ? 'Не буду смотреть' : 'Не буду читать'}`,
            color: 'bg-red-700',
            hover: 'hover:bg-red-700'
        },
        {status: 5, name: 'Фу, какая гадость', color: 'bg-red-700', hover: 'hover:bg-red-700'},
    ]
    const {setIsOpen, isOpen, ref} = useClickOutside()

    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const setStatusHandler = (statusId: number) => {
        if (statusId === status) {
            return setIsOpen(false)
        }
        setStatus({status: statusId, animeID})
            .unwrap()
            .catch(err => console.error(err))
            .finally(() => {
                setIsOpen(false)
                dispatch(
                    AnimeAPI.util.updateQueryData('getAllAnime', {
                        page: +params.get('page') || 1,
                        query: filter,
                        passkey: null
                    }, (draft) => {
                        const anime = draft.data.find(a => a.id === animeID);
                        if (anime) {
                            anime.status = statusId;
                        }
                    }),
                )
            })
    }

    if (!user) return null;
    return (
        <div className={'relative cursor-pointer'} ref={ref}>
            <div className={'relative flex items-center'} onClick={(e) => {
                e.stopPropagation()
                setIsOpen(true)
            }}>
                {isOpen ?
                    <div className={'absolute right-2 z-[1000]'}
                         onClick={e => {
                             e.stopPropagation();
                             setIsOpen(false)
                         }}>
                        <IoCaretUp className={'text-xl'}/>
                    </div>
                    :
                    <div className={'absolute right-2 z-[40]'}>
                        <IoCaretDown className={'text-xl'}/>
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
                <div className={'absolute top-0 z-[50] left-0 bg-neutral-800 flex flex-col gap-2 rounded-lg w-full'}
                >
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
