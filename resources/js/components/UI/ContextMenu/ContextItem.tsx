import React, {FC} from 'react';

interface ContextItemProps {
    text: string
    icon: React.ReactNode
    color?: string

    onClick?(): void
}

const ContextItem: FC<ContextItemProps> = ({text, icon, onClick, color}) => {
    return (
        <li onClick={onClick} className={`flex justify-between items-center ${color}`}>
            {text} {icon}
        </li>
    );
};

export default ContextItem;
