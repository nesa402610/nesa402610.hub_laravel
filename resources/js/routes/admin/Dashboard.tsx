import React, {FC} from 'react';
import {useGetOverviewQuery} from "../../services/admin/dashboardService";
import Loader from "../../components/Loader";
import DashboardGraph from "./Dashboard/DashboardGraph";

const Dashboard: FC = () => {
    const {data, isLoading} = useGetOverviewQuery()
    const [total, rx, ff] = [data?.collection.anime.total, data?.collection.anime.rx, data?.collection.anime.ff]
    if (isLoading) return <Loader/>
    return (
        <div className={'flex flex-col gap-4'}>
            <div className={'bg-slate-700 p-4 rounded-lg'}>
                <h2 className={'text-xl font-bold text-center mb-2'}>Обзор по аниме и манге</h2>
                <div className={'flex gap-4'}>
                    <div
                        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>
                        <div className={'flex flex-col'}>
                            {/*<span>Всего аниме: {data.collection.anime.total}</span>*/}
                            {/*<span>Rx: {data.collection.anime.rx}</span>*/}
                            {/*<span>Family-friendly: {data.collection.anime.ff}</span>*/}
                            {/*<AnimeChartPie total={total} rx={rx} ff={ff}/>*/}
                            <DashboardGraph values={data}/>
                        </div>
                        <span>Всего студий: {data.collection.anime.studiosCount}</span>
                    </div>
                    {/*    <div*/}
                    {/*        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>*/}
                    {/*        Всего манги: {data.collection.manga.total}*/}
                    {/*    </div>*/}
                    {/*    <div*/}
                    {/*        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>*/}
                    {/*        Всего тегов: {data.collection.tagsCount}*/}
                    {/*    </div>*/}
                </div>
            </div>
            <div className={'flex gap-4 bg-slate-700 p-4 rounded-lg'}>
                <span>Всего проект я сделал: {data.projects.total}</span>
                <span>Завершил: {data.projects.completed}</span>
                <span>Бросил: {data.projects.dropped}</span>
                <span>Запланировал: {data.projects.planned}</span>
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
