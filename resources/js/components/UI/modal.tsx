import React, {FC} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {closeModalAction} from "../../store/modalReducer";


const Modal: FC = () => {
    const modal = useTypedSelector(state => state.modal)
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(closeModalAction())
    };
    return (
        <div className={'fixed backdrop-blur-md z-40 overflow-auto h-full top-0 left-0 bg-stone-700/75 w-full flex justify-center items-center'}
             onClick={closeModal}
        >
            <div className={'absolute mx-8'} onClick={e => e.stopPropagation()}>
                {modal.title && <h2 className={'text-2xl mb-4 text-center font-bold'}>
                    {modal.title}
                </h2>}
                {modal.children}
            </div>
        </div>
    );
};

export default Modal;
