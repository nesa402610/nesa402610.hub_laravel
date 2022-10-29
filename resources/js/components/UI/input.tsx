import React, {FC} from 'react';

interface inputProps {
    type: string;
    placeholder?: string
    value?: any
    bg?: string
    required?: boolean
    onKeyPress?: (e) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<inputProps> = (props) => {
    return (
        <input className={'w-full p-2 focus-visible:outline-stone-400 focus-visible:outline focus-visible:outline-2 autofill:bg-stone-600 rounded-lg mt-1 ' +
            (props.bg ? props.bg : 'bg-stone-600')}
               type={props.type}
               onChange={props.onChange}
               value={props.value}
               placeholder={props.placeholder}
               onKeyPress={props.onKeyPress}
               required={props.required}/>
    );
};

export default Input;
