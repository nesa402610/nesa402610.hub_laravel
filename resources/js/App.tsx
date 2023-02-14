import React from 'react';
import Header from "./components/header";
import './App.css'
import './API/axios'
import Index from "./routes";

const App = () => {
    return (
        <>
            <Header/>
            <Index/>
        </>
    );
};

export default App;
