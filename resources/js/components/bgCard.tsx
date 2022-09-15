import React, {FC} from 'react';

interface bgCardProps {
    children: React.ReactNode
}

const BgCard: FC<bgCardProps> = ({children}) => {
    return (
        <div className={'flex gap-4 justify-between bg-stone-600 p-4 rounded-lg'}>
            {children}
        </div>
    );
};

export default BgCard;
