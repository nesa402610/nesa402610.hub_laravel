import React, {FC} from 'react';

interface inputProps {
    type: string;
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<inputProps> = ({type, onChange, placeholder}) => {
    return (
        <input className={'w-full p-2 focus-visible:outline-stone-400 focus-visible:outline focus-visible:outline-2 bg-stone-700 autofill:bg-stone-600 rounded-lg mt-1'} type={type} onChange={onChange} placeholder={placeholder}/>
    );
};

export default Input;
