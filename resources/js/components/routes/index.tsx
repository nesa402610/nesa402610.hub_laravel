import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import RoadmapPage from "./roadmapPage";
import ProfilePage from "./profilePage";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import AccessDenied from "./errors/accessDenied";
import {IUser} from "../../types/types";
import ProjectsPage from "./admin/ProjectsPage";

const Index: FC = () => {
    const user = useTypedSelector(state => state.auth.user) as IUser
    return (
        <>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/roadmap'} element={<RoadmapPage/>}/>
                <Route path={'/registration'} element={<RegistrationPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}/>
                <Route path={'/admin/projects'} element={user?.id === 1 ? <ProjectsPage/> : <AccessDenied/>}/>
            </Routes>
        </>
    );
};

export default Index;
