import React, {useEffect} from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import axios from "axios";
import Modal from "./components/UI/modal";
import Index from "./routes";
import {login} from "./store/reducers/authSlice";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {setProjects} from "./store/reducers/homePageSlice";

const App = () => {
    const dispatch = useAppDispatch()
    const modal = useAppSelector(state => state.modal)

    useEffect(() => {
        axios.get('/projects').then(r => dispatch(setProjects(r.data)))
        axios.post('/checkLogin')
            .then(r => {
                dispatch(login(r.data))
            }).catch(() => {
            // dispatch(logoutAction(null))
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
