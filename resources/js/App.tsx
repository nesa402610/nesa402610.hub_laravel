import React, {useEffect} from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginAction, logoutAction} from "./store/authReducer";
import {useTypedSelector} from "./hooks/useTypedSelector";
import Modal from "./components/UI/modal";
import Index from "./routes";

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
            {modal.isModal && <Modal/>}
            <Header/>
            <Index/>
        </>
    );
};

export default App;
