import React, {Dispatch, FC, SetStateAction} from 'react';

interface TitleFieldProps {
    title: string

    setTitle: Dispatch<SetStateAction<string>>
}

const TitleField: FC<TitleFieldProps> = ({title, setTitle}) => {
    return (
        <label className={'flex flex-col w-full'}>
            <span>Название</span>
            <input type="text"
                   value={title}
                   placeholder={'Мастер меча онлайн'}
                   onChange={e => setTitle(e.target.value)}/>
        </label>
    );
};

export default TitleField;
