import React, {FC} from 'react';

interface submitButtonProps {
    onClick?: (e) => void
    children: any
}

const SubmitButton: FC<submitButtonProps> = ({onClick, children}) => {
    return (
        <button onClick={onClick} className={'bg-stone-600 p-2 rounded-lg hover:bg-stone-500 transition-all'}>
            {children}
        </button>
    );
};

export default SubmitButton;
