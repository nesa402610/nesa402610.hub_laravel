import React from 'react';
import {Pie} from "@ant-design/charts";

const AnimeChartPie = ({total, rx, ff}) => {
    const data = [
        {
            name: 'Rx - ' + rx,
            value: rx,
        },
        {
            name: 'FF - ' + ff,
            value: ff,
        },
        {
            name: 'Total - ' + total,
            value: total,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'name',
        radius: 1,
        innerRadius: 0.5,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    color: 'white',
                    textOverflow: 'ellipsis',
                },
                content: 'Аниме',
            },
        },
    };
    return <Pie {...config} />;
};

export default AnimeChartPie;
