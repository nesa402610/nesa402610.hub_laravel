import React, {FC} from 'react';

interface BaubleProps {
    className?: string
    children: React.ReactNode

    onClick?(): void
}

const Bauble: FC<BaubleProps> = (props) => {
    return (
        <div onClick={props.onClick} className={`bg-neutral-800 px-2 rounded-full gap-1 ${props.className}`}>
            {props.children}
        </div>
    );
};

export default Bauble;
