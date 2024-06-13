import React, {FC} from 'react';
import {useGetOverviewQuery} from "services/admin/dashboardService";
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
                        <div className={'flex flex-col'}>
                            <span>Всего аниме: {data.anime.total}</span>
                            <span>Rx: {data.anime.rx}</span>
                            <span>Family-friendly: {data.anime.ff}</span>
                            {/*<AnimeChartPie total={data} rx={rx} ff={ff}/>*/}
                            {/*<DashboardGraph values={data}/>*/}
                            {/*<ReactApexChart options={options} series={series} type="radar"*/}
                            {/*                height={350}/>*/}
                            <span>Всего студий: {data.anime.studiosCount}</span>
                        </div>
                    </div>
                    <div
                        className={'bg-slate-800 p-4 rounded-lg flex flex-col items-center justify-center flex-1 gap-2'}>
                        <span>Всего жанров: {data.anime.genresCount}</span>
                        <span>Всего тегов: {data.anime.tagsCount}</span>
                    </div>
                </div>
            </div>
            <div className={'flex gap-4 bg-slate-700 p-4 rounded-lg'}>
                <span>Всего проект я сделал: {data.works.total}</span>
                <span>Завершил: {data.works.completed}</span>
                <span>Бросил: {data.works.dropped}</span>
                <span>Запланировал: {data.works.planned}</span>
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
