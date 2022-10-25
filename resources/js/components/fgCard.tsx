import React, {FC} from 'react';

interface fgCardProps {
    children: React.ReactNode
    className?: string
    onClick?: any
}

const FgCard: FC<fgCardProps> = ({children, className, onClick}) => {
    return (
        <div className={'flex-1 bg-stone-700 shadow-md rounded-lg xs:p-2 sm:p-4 ' + className}
        onClick={onClick}
        >
            {children}
        </div>
    );
};

export default FgCard;
