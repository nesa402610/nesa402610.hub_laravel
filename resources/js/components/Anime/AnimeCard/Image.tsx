import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";

interface ImageProps {
    path: string
    link: boolean
    image: string
}

const Image: FC<ImageProps> = ({link = false, path, image}) => {
    const nav = useNavigate()
    const navigateHandle = () => {
        if (link) {
            nav(path);
        }
    };
    return (
        <picture className={'flex justify-center w-[220px]'}>
            <img onClick={navigateHandle}
                 className={`object-contain self-start rounded-lg min-h-[150px] w-[220px] h-auto ${link ? 'hover:scale-105 transition-all cursor-pointer' : 'cursor-default'}`}
                 src={image}
                 alt="Изображение тайтла"/>
        </picture>
    );
};

export default Image;
