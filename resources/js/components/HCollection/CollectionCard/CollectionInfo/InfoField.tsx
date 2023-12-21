import React, {FC} from 'react';

interface InfoFieldProps {
    title: string
    value?: any
    children?: React.ReactNode
    hidden?: boolean
}

const InfoField: FC<InfoFieldProps> = ({title, value, children, hidden}) => {
    if (hidden) return null
    return (
        <div className={'flex gap-1'}>
            <h4>{title}</h4>
            <span>
                {value ?? children}
            </span>
        </div>
    );
};

export default InfoField;
