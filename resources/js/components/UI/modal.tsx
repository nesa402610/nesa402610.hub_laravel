import React, {FC} from 'react';
interface modalProps {
    isModal: boolean,
    modalInput: string,
    closeModal: any
}
const Modal: FC<modalProps> = ({isModal, modalInput, closeModal}) => {
    return (
        <>
            {
                isModal ?
                    <div className={'fixed top-0 left-0 bg-stone-700/75 w-full flex justify-center' + (isModal ? ' active' : '')}
                         onClick={closeModal}>
                        <div className={'relative'} onClick={e => e.stopPropagation()}>
                            <img className='h-screen p-4' src={modalInput} alt=""/>
                        </div>
                    </div>
                    : ''
            }</>
    );
};

export default Modal;