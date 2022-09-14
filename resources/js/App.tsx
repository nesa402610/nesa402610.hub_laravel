import React from 'react';
import Header from "./components/header";
import Index from "./components/routes";
import './App.css'
import './API/axios'

const App = () => {
    return (
        <>
            <Header/>
            <Index/>
        </>
    );
};

export default App;
