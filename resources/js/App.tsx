import React, {useEffect} from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import Modal from "./components/UI/modal";
import Index from "./routes";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchUser} from "./store/asyncActions/userActionsCreators";
import {fetchProjects} from "./store/asyncActions/projectActionCreators";

const App = () => {
    const dispatch = useAppDispatch()
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
