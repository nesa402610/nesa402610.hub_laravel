import React, {FC} from 'react';

interface submitButtonProps {
    onClick?: (e) => void
    children: any
    className?: string
}

const SubmitButton: FC<submitButtonProps> = ({onClick, children, className}) => {
    return (
        <button onClick={onClick} className={'bg-stone-600 p-2 rounded-lg hover:bg-stone-500 transition-all ' + className}>
            {children}
        </button>
    );
};

export default SubmitButton;
