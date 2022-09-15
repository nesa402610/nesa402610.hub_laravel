import React, {FC} from 'react';
import {Route, Routes } from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import RoadmapPage from "./roadmapPage";
import ProfilePage from "./profilePage";

const Index: FC = () => {
    return (
    <>
        <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/roadmap'} element={<RoadmapPage/>}/>
            <Route path={'/registration'} element={<RegistrationPage/>}/>
            <Route path={'/login'} element={<LoginPage/>}/>
            <Route path={'/profile'} element={<ProfilePage/>}/>
        </Routes>
    </>
    );
};

export default Index;
