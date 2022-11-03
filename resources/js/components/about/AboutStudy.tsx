import React, {FC} from 'react';
import FgCard from "../fgCard";

const AboutStudy: FC = () => {
    const education = [
        {
            name: 'Политехнический колледж №8 им И. Ф. Павлова',
            link: 'https://pk-8.mskobr.ru',
            start: 2016,
            end: 2020,
            educ: 'Среднее-специальное',
            diplomaImg: '',
        },
        {
            name: 'Университет им. С. Ю. Виттер',
            link: 'https://www.muiv.ru/',
            start: 2020,
            end: 2024,
            educ: 'Высшее. Бакалавриат',
            diplomaImg: '',
        },
    ]
    return (
        <>
            <div className={'flex gap-4 sm:flex-col md:flex-row'}>
                {education.map(item =>
                    <FgCard>
                        <div className={'flex justify-between'}>
                            <div>{item.name}</div>
                            <span>{item.start}-{item.end}</span>
                        </div>
                        <div className={'flex justify-between'}>
                            <a className={'text-stone-200 italic hover:text-stone-400 cursor-pointer'}
                               target={'_blank'}
                               href={item.link}
                            >Перейти на сайт</a>
                            <span className={'italic'}>{item.educ}</span>
                        </div>
                    </FgCard>
                )}
            </div>
        </>
    )
        ;
};

export default AboutStudy;
