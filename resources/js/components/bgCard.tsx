import React, {FC} from 'react';

interface bgCardProps {
    children: React.ReactNode
    className?: string
}

const BgCard: FC<bgCardProps> = ({children, className}) => {
    return (
        <div className={'flex gap-4 xs:flex-col sm:flex-row justify-between bg-stone-600 p-4 rounded-lg ' + className}>
            {children}
        </div>
    );
};

export default BgCard;
