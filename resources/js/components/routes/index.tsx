import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";

const Index: FC = () => {
    return (
    <>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/registration'} element={<RegistrationPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
        </Routes>
    </>
    );
};

export default Index;
