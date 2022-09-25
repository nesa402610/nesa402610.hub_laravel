import React, {useEffect} from 'react';
import Header from "./components/header";
import Index from "./components/routes";
import './App.css'
import './API/axios'
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginAction, logoutAction} from "./store/authReducer";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Modal from "./components/UI/modal";

const App = () => {
    const dispatch = useDispatch()
    const modal = useTypedSelector(state => state.modal)
    useEffect(() => {
        axios.post('/checkLogin')
            .then(r => {
                dispatch(loginAction(r.data))
            }).catch(() => {
            dispatch(logoutAction(null))
        })
    }, [])
    return (
        <>
            {modal.isModal &&
                <Modal>
                    {modal.children}
                </Modal>
            }
            <Header/>
            <Index/>
        </>
    );
};

export default App;
