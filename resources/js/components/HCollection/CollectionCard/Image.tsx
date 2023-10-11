import React, {FC} from 'react';
import {Link} from "react-router-dom";

interface ImageProps {
    link: boolean
    path: string
    image: string
}

const Image: FC<ImageProps> = ({link = false, path, image}) => {
    return (
        <Link className={'flex justify-center'}
              to={`${link ? path : ""}`}>
            <img
                className={`rounded-lg min-h-[150px] w-[200px] h-auto ${link ? 'hover:scale-105 transition-all' : 'cursor-default'}`}
                src={image}
                alt="Изображение тайтла"/>
        </Link>
    );
};

export default Image;
