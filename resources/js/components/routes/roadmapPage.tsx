import React, {FC} from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";

const RoadmapPage: FC = () => {
    return (
        <div className={'flex flex-col mx-4'}>
            <h1 className={'text-2xl font-bold text-center mb-4'}>Что в планах</h1>
            <BgCard>
                <FgCard>
                    <h2 className={'text-xl font-bold text-center'}>TODO</h2>
                    <ul className={'list-disc list-inside'}>
                        <li className={'font-bold'}>Рейтинг карточек</li>
                        <li className={'font-bold'}>Поиск по проектам</li>
                        <li className={'font-bold'}>Профиль</li>
                        <ol className={'list-disc list-inside ml-6'}>
                            <li>Смена данных</li>
                            <li>Логин через соц сети</li>
                            <li>Куда ставил рейтинги</li>
                        </ol>
                        <li className={'font-bold'}>Подтверждение почты</li>
                    </ul>
                </FgCard>
                <FgCard>
                    <h2 className={'font-bold text-lg text-center'}>Информация</h2>
                    <p>Это просто планы, которые я хочу реализовать.</p>
                    <p>Что-то может быть не выполнено, что может появится, чего нет в TODO</p>
                    <p>Я и сам толком не знаю, что я смогу реализовать, а что нет.</p>
                </FgCard>
            </BgCard>
        </div>
    );
};

export default RoadmapPage;
