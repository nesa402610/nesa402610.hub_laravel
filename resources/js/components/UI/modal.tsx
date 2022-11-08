import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {closeModal} from "../../store/reducers/modalSlice";


const Modal: FC = () => {
    const modal = useAppSelector(state => state.modal)
    const dispatch = useAppDispatch()
    const closeModalHandler = () => {
        dispatch(closeModal())
    };
    return (
        <div className={'fixed backdrop-blur-md z-40 overflow-auto h-full top-0 left-0 bg-stone-700/75 w-full flex justify-center items-center'}
             onClick={closeModalHandler}
        >
            <div className={'absolute mx-8 w-full flex flex-col'} onClick={e => e.stopPropagation()}>
                {modal.title && <h2 className={'text-2xl mb-4 text-center font-bold'}>
                    {modal.title}
                </h2>}
                {modal.children}
            </div>
        </div>
    );
};

export default Modal;
