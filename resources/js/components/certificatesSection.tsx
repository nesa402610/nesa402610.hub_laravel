import React, {FC} from 'react';
import CertCard from './UI/certCard';
import {useDispatch} from "react-redux";
import {setModalAction} from "../store/modalReducer";

const CertificatesSection: FC = () => {
    const dispatch = useDispatch()

    const openImageFC = (img: string) => {
        dispatch(setModalAction({
            title: '',
            isModal: true,
            children: <img className='h-screen p-4' src={img} alt=""/>
        }))
    };
    return (
        <section>
            <h2 className={'text-2xl text-center my-8'}>Сертификаты</h2>
            <div className={'grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4'}>
                <CertCard handler={openImageFC}/>
            </div>
        </section>
    );
};

export default CertificatesSection;
