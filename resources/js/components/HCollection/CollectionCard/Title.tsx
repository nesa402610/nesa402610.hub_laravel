import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {ICollection} from "../../../types/types";

interface TitleProps {
    link?: boolean
    collection: ICollection
    path: string
}

const Title: FC<TitleProps> = ({link, collection, path}) => {
    return (
        <Link
            to={link ? path : ''}>
            <div
                className={`flex items-center flex-wrap ${link ? "hover:text-neutral-300 transition-all" : "cursor-default"}`}>
                {collection.title_ru &&
                    <>
                        <span>{collection.title_ru}</span>
                        <span>&nbsp;/&nbsp;</span>
                    </>
                }
                <span>{collection.title_original}</span>
            </div>
        </Link>
    );
};

export default Title;
