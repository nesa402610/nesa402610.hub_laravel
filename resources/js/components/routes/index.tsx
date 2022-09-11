import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";

const Index: FC = () => {
    return (
    <>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/registration'} element={<RegistrationPage/>}/>
        </Routes>
    </>
    );
};

export default Index;
