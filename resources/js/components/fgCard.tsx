import React, {FC} from 'react';

interface fgCardProps {
    children: React.ReactNode
}
const FgCard: FC<fgCardProps> = ({children}) => {
    return (
        <div className={'flex-1 bg-stone-700 shadow-md rounded-lg p-4'}>
            {children}
        </div>
    );
};

export default FgCard;
