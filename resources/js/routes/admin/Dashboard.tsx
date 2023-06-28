import React, {FC} from 'react';
import {useGetOverviewQuery} from "../../services/admin/dashboardService";
import Loader from "../../components/Loader";

const Dashboard: FC = () => {
    const {data, isLoading} = useGetOverviewQuery()
    if (isLoading) return <Loader/>
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'bg-slate-700 p-4 rounded-lg'}>
                <h2 className={'text-xl font-bold text-center mb-2'}>Обзор по аниме и манге</h2>
                <div className={'flex gap-4'}>
                    <div
                        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>
                        <span>Всего аниме: {data.animeCount}</span>
                        <span>Всего студий: {data.animeStudiosCount}</span>
                    </div>
                    <div
                        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>
                        Всего манги: {data.mangaCount}
                    </div>
                    <div
                        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>
                        Всего тегов: {data.tagsCount}
                    </div>
                </div>
            </div>
            <div className={'bg-slate-700 p-4 rounded-lg'}>
                Всего проект я сделал: {data.projectsCount}
            </div>
            <div className={'bg-slate-700 p-4 rounded-lg'}>
                Всего пользователей: {data.usersCount}
            </div>
            <div className={'bg-slate-700 p-4 rounded-lg'}>
                Всего сообщений: {data.messagesCount}
            </div>
        </div>
    );
};

export default Dashboard;
