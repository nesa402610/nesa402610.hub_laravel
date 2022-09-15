import React, {useEffect} from 'react';
import Header from "./components/header";
import Index from "./components/routes";
import './App.css'
import './API/axios'
import axios from "axios";
import {useDispatch} from "react-redux";
import {loginAction} from "./store/authReducer";

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        axios.post('/checkLogin')
            .then(r => {
                dispatch(loginAction(r.data))
            }).catch(err => {
                localStorage.removeItem('auth')
        })
    }, [])
    return (
        <>
            <Header/>
            <Index/>
        </>
    );
};

export default App;
