import React, {FC} from 'react';
import BgCard from "../components/bgCard";
import FgCard from "../components/fgCard";
import ListItem from "../components/UI/listItem";

const RoadmapPage: FC = () => {
    return (
        <div className={'flex flex-col mx-4'}>
            <h1 className={'text-2xl font-bold text-center mb-4'}>Что в планах</h1>
            <BgCard>
                <FgCard>
                    <h2 className={'text-xl font-bold text-center'}>TODO</h2>
                    <ul>
                        <ListItem bold>Рейтинг карточек</ListItem>
                        <ListItem bold>Поиск по проектам</ListItem>
                        <ListItem bold>Профиль</ListItem>
                        <ol className={'list-disc list-inside ml-6'}>
                            <ListItem completed>Смена данных</ListItem>
                            <ListItem completed>Кастомизация профиля</ListItem>
                            <ListItem completed>Просмотр других профилей</ListItem>
                            <ListItem>Логин через соц сети</ListItem>
                            <ListItem>Куда ставил рейтинги</ListItem>
                        </ol>
                        <ListItem bold>Подтверждение почты</ListItem>
                        <ListItem bold completed>Личный блог</ListItem>
                        <ListItem bold>Страницу обо мне</ListItem>
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
