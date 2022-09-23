import React, {FC} from 'react';

interface fgCardProps {
    children: React.ReactNode
    className?: string
}
const FgCard: FC<fgCardProps> = ({children, className}) => {
    return (
        <div className={'flex-1 bg-stone-700 shadow-md rounded-lg p-4 ' + className}>
            {children}
        </div>
    );
};

export default FgCard;
