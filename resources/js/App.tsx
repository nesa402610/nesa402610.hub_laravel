import React from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import Modal from "./components/UI/modal";
import Index from "./routes";
import {useAppSelector} from "./hooks/redux";

const App = () => {
    const modal = useAppSelector(state => state.modal)
    return (
        <>
            {modal.isModal && <Modal/>}
            <Header/>
            <Index/>
        </>
    );
};

export default App;
