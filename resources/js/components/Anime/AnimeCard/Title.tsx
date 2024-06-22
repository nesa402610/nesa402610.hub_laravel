import React, {FC} from 'react';
import {Link} from "react-router-dom";

interface TitleProps {
    link?: boolean
    RU: string
    EN: string
    ORIGINAL: string
    path: string
}

const Title: FC<TitleProps> = ({link = false, RU, EN, ORIGINAL, path}) => {
    const WrapperTag = link ? Link : 'h3';
    const wrapperProps = link ? {to: path} : null;
    return (
        <div className={'flex flex-col'}>
            <WrapperTag {...wrapperProps}>
                <div
                    className={`flex items-center flex-wrap ${link ? "hover:text-neutral-300 transition-all" : "cursor-default"}`}>
                    {RU &&
                        <>
                            <span>{RU}</span>
                            <span>&nbsp;/&nbsp;</span>
                        </>
                    }
                    <span>{ORIGINAL}</span>
                </div>
            </WrapperTag>
            <span className={'text-sm italic text-neutral-400'}>{EN}</span>
        </div>
    );
};

export default Title;
