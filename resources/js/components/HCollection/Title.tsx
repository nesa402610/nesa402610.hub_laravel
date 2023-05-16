import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {ICollection} from "../../types/types";

interface TitleProps {
    link?: boolean
    hover?: boolean
    collection: ICollection
}

const Title: FC<TitleProps> = ({link, collection, hover}) => {
    return (
        <Link
            to={link ? collection.id + '-' + (collection.title_en ? collection.title_en.toLowerCase().replace(' ', '-') : collection.title_original.toLowerCase().replace(' ', '-')) : ''}>
            <div
                className={`flex items-center flex-wrap ${hover ? "hover:text-neutral-300 transition-all" : ""}`}>
                <span>{collection.title_ru}</span>
                <span>&nbsp;/&nbsp;</span>
                <span>{collection.title_original}</span>
            </div>
        </Link>
    );
};

export default Title;
