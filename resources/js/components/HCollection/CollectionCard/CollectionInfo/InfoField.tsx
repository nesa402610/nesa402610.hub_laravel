import React, {FC} from 'react';

interface InfoFieldProps {
    title: string
    value?: any
    children?: any
}

const InfoField: FC<InfoFieldProps> = ({title, value, children}) => {
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
