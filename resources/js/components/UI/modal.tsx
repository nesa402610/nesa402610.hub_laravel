import React, {FC} from 'react';

interface ModalProps {
    title: string,
    children: React.ReactElement,
    closeHandler: () => void
}

const Modal: FC<ModalProps> = ({title, children, closeHandler}) => {
    const closeModalHandler = () => {
        closeHandler()
    };
    return (
        <div className={'fixed backdrop-blur-md z-40 overflow-auto h-full top-0 left-0 bg-stone-700/75 w-full flex justify-center items-center'}
             onClick={closeModalHandler}
        >
            <div className={'absolute mx-8 flex flex-col'} onClick={e => e.stopPropagation()}>
                {title && <h2 className={'text-2xl mb-4 text-center font-bold'}>
                    {title}
                </h2>}
                {children}
            </div>
        </div>
    );
};

export default Modal;
