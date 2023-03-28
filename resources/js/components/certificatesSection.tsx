import React, {FC, useState} from 'react';
import CertCard from "./certificateCard/certCard";
import Modal from "./UI/modal";

const CertificatesSection: FC = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');

  const openImageFC = (img: string) => {
    setImage(img)
    setIsModal(true)
  };
  return (
    <>
      {isModal &&
        <Modal title={''} closeHandler={setIsModal}>
          <img className="p-4 max-h-screen" src={image} alt=""/>
        </Modal>
      }
      <section>
        <h2 className={'text-2xl text-center my-8'}>Сертификаты</h2>
        <div className={'grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4'}>
          <CertCard handler={openImageFC}/>
        </div>
      </section>
    </>
  );
};

export default CertificatesSection;
