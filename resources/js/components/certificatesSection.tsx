import React, {FC, useState} from 'react';
import CertCard from './UI/certCard';
import Modal from "./UI/modal";

const CertificatesSection: FC = () => {
    const [isModal, setModal] = useState<boolean>(false);
    const [modalInput, setModalInput] = useState<string>('');

    const openImageFC = (img: string) => {
        setModal(true);
        setModalInput(img);
    };
    const closeModal = () => {
        setModal(false);
        setModalInput('');
    };
    return (
        <section>
            <Modal isModal={isModal} modalInput={modalInput} closeModal={closeModal}/>
            <h2 className={'text-2xl text-center my-8'}>Сертификаты</h2>
            <div className={'grid grid-cols-3 gap-4 p-4'}>
                <CertCard handler={openImageFC}/>
            </div>
        </section>
    );
};

export default CertificatesSection;