import React, {FC} from 'react';

interface BaubleProps {
    className?: string
    children: React.ReactNode
}

const Bauble: FC<BaubleProps> = ({className, children}) => {
    return (
        <div className={`bg-neutral-800 px-2 rounded-full gap-2 ${className}`}>
            {children}
        </div>
    );
};

export default Bauble;
