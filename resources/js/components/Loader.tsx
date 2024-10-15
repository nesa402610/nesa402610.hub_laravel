import React, {FC} from "react";
import {RiLoader3Fill} from "react-icons/ri";

interface LoaderProps {
    text?: string
    center?: boolean
    className?: string
}

const Loader: FC<LoaderProps> = ({text = 'Загрузка', center = false, className}) => {
    return (
        <div
            className={`m-4 flex justify-center items-center flex-1 ${center ? 'sticky w-full h-screen top-0 left-0' : ''} ${className}`}>
            <h2 className={'text-center font-bold text-xl'}>{text}...</h2>
            <RiLoader3Fill size={'2rem'} className={'animate-spin'}/>
        </div>
    );
};

export default Loader;
