import React, {FC} from 'react';
import {Link} from "react-router-dom";

const Error: FC = () => {
    return (
        <div className={'flex flex-col items-center h-screen justify-center'}>
            <h2 className={'text-2xl font-bold'}>Ой-ой, кажется произошла какая-то ошибка</h2>
            <h3>Возможно, у тебя нет доступа к этому?</h3>
            <Link to={'/'} className={'text-neutral-400 hover:text-neutral-600'}>Возвращайся на главную</Link>

        </div>
    );
};

export default Error;
