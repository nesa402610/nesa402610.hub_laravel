import React, {FC, useState} from 'react';

interface AnimeFieldProps {
    value: string | number
    name: string
    type?: 'text' | 'date' | 'checkbox' | 'textarea' | 'number'
    title: string
    required?: boolean

    onChange(e: any, name: string): void
}

const AnimeField: FC<AnimeFieldProps> = ({value, onChange, name, type = 'text', title, required = false}) => {
    const [dirty, setDirty] = useState(false);
    return (
        <label className={'flex flex-col flex-1'}>
            <span>{title} {required && '*'}</span>
            {type === 'textarea' ?
                <textarea className={"rounded-lg bg-neutral-600 p-2"} value={value || ''}
                          onChange={e => onChange(e, name)}/>
                :
                <input type={type} value={value}
                       onChange={e => onChange(e, name)}/>
            }
        </label>
    );
};

export default AnimeField;
