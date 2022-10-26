import React, {FC} from 'react';

interface bgCardProps {
    children: React.ReactNode
    className?: string
    onClick?: any
}

const BgCard: FC<bgCardProps> = ({children, className = '', onClick}) => {
    return (
        <div onClick={onClick} className={'flex gap-4 xs:flex-col sm:flex-row justify-between bg-stone-600 p-4 rounded-lg ' + className}>
            {children}
        </div>
    );
};

export default BgCard;
