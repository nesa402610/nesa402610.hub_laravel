import React, {FC} from 'react';
import {Column} from "@ant-design/charts";
import {IOverview} from "../../../services/admin/dashboardService";

interface DashboardGraphProps {
    values: IOverview
}

const DashboardGraph: FC<DashboardGraphProps> = ({values}) => {

    const data = [
        {
            name: 'Всего',
            type: 'Аниме',
            value: values.collection.anime.total,
        },
        {
            name: 'Rx',
            type: 'Аниме',
            value: values.collection.anime.rx,
        },
        {
            name: 'FF',
            type: 'Аниме',
            value: values.collection.anime.ff,
        },
        {
            name: 'Студии',
            type: 'Аниме',
            value: values.collection.anime.studiosCount,
        },
        {
            name: 'Всего манги',
            type: 'Манга',
            value: values.collection.manga.total,
        },
        {
            name: 'Всего сообщений',
            type: 'Сообщения',
            value: values.messagesCount,
        },
        {
            name: 'Всего пользователей',
            type: 'Пользователи',
            value: values.usersCount,
        },
        {
            name: 'Всего тегов',
            type: 'Тэги',
            value: values.collection.tagsCount
        }
    ];
    const config = {
        data,
        isGroup: true,
        xField: 'type',
        yField: 'value',
        seriesField: 'name',
        columnStyle: {
            radius: [20, 20, 0, 0],
        },
        style: {
            autoFit: true,
            width: '1000px',
        },
        columnWidthRatio: 1,

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],
        /** 设置间距 */
        // marginRatio: 0,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    return <Column {...config} />;
};

export default DashboardGraph;
