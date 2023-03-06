import React, {Dispatch, FC, SetStateAction} from 'react';

interface ModalProps {
    title: string,
    children: React.ReactElement,
    closeHandler: Dispatch<SetStateAction<boolean>>
}

const Modal: FC<ModalProps> = ({title, children, closeHandler}) => {
    const closeModalHandler = () => {
        closeHandler(false)
    };
    return (
        <div className={'fixed left-[80px] backdrop-blur-md z-40 overflow-auto h-full top-0 left-0 bg-neutral-900/75 w-full flex justify-center items-center'}
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
