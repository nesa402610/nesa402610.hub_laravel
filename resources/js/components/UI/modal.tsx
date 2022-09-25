import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {closeModalAction} from "../../store/modalReducer";

interface modalProps {
    children?: React.ReactNode
}

const Modal: FC<modalProps> = ({children}) => {
    const modal = useTypedSelector(state => state.modal)
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(closeModalAction())
    };
    return (
        <div className={'fixed z-40 h-full top-0 left-0 bg-stone-700/75 w-full flex justify-center'}
             onClick={closeModal}
        >
            <div>
                {modal.title}
            </div>
            <div className={'relative'} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
