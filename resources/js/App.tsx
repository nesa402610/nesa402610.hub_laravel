import React, {useEffect} from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import axios from "axios";
import Modal from "./components/UI/modal";
import Index from "./routes";
import { getProjectsAction } from './store/reducers/homePageReducer';
import {useDispatch} from "react-redux";
import {login} from "./store/reducers/authSlice";
import {useAppSelector} from "./hooks/redux";

const App = () => {
    const dispatch = useDispatch()
    const modal = useAppSelector(state => state.modal)

    useEffect(() => {
        axios.get('/projects').then(r => dispatch(getProjectsAction(r.data)))
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
