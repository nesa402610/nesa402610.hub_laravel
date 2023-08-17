import React, {Dispatch, FC, SetStateAction} from 'react';

interface TitleFieldProps {
    title: string
    searchFn(): void

    setTitle: Dispatch<SetStateAction<string>>
}

const TitleField: FC<TitleFieldProps> = ({title, setTitle, searchFn}) => {
    return (
        <label className={'flex flex-col w-full'}>
            <span>Название</span>
            <input type="text" onKeyPress={e => {
                if (e.key === 'Enter') searchFn()
            }}
                   value={title}
                   placeholder={'Мастер меча онлайн'}
                   onChange={e => setTitle(e.target.value)}/>
        </label>
    );
};

export default TitleField;
