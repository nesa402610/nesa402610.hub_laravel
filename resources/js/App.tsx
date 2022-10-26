import React, {useEffect} from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import Modal from "./components/UI/modal";
import Index from "./routes";
import {AppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUser} from "./store/asyncActions/userActionsCreators";
import {fetchProjects} from "./store/asyncActions/projectActionCreators";
import {useDispatch} from "react-redux";

const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const modal = useAppSelector(state => state.modal)

    useEffect(() => {
        dispatch(fetchUser())
        dispatch(fetchProjects())
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
