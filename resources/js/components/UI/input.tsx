import React, {FC} from 'react';

interface inputProps {
    type: string;
    placeholder?: string
    value?: string
    bg?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<inputProps> = ({type, onChange, placeholder, bg, value}) => {
    return (
        <input className={'w-full p-2 focus-visible:outline-stone-400 focus-visible:outline focus-visible:outline-2 autofill:bg-stone-600 rounded-lg mt-1 ' +
            (bg ? bg : 'bg-stone-600')}
               type={type} onChange={onChange} value={value} placeholder={placeholder}/>
    );
};

export default Input;
