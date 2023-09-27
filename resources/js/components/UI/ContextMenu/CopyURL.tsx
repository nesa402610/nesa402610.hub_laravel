import React, {FC, SetStateAction} from 'react';
import {FaRegCopy} from "react-icons/fa6";

interface CopyUrlProps {
    link: string
    setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

const CopyUrl: FC<CopyUrlProps> = ({link, setIsOpen}) => {
    const copyLinkHandle = () => {
        navigator.clipboard.writeText(link)
            .then(() => setIsOpen(false))
    }
    if (!link) return null
    return (
        <li onClick={copyLinkHandle} className={'flex justify-between items-center gap-8'}>
            Копировать URL <FaRegCopy/>
        </li>
    );
};

export default CopyUrl;
