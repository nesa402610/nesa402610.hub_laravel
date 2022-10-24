import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import RoadmapPage from "./roadmapPage";
import ProfileEditPage from "./profileEditPage";
import AccessDenied from "./errors/accessDenied";
import {IUser} from "../types/types";
import ProjectsPage from "./admin/ProjectsPage";
import ProfilePage from "./profilePage";
import BlogPage from "./BlogPage";
import {useAppSelector} from "../hooks/redux";

const Index: FC = () => {
    const user = useAppSelector(state => state.auth.user) as IUser
    return (
        <>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/roadmap'} element={<RoadmapPage/>}/>
                <Route path={'/registration'} element={<RegistrationPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/admin/projects'} element={user?.id === 1 ? <ProjectsPage/> : <AccessDenied/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}>
                    <Route path={':username'} element={<ProfilePage/>}/>
                </Route>
                <Route path={'/profile/edit'} element={<ProfileEditPage/>}/>
                <Route path={'/blog'} element={<BlogPage/>}/>
            </Routes>

        </>
    );
};

export default Index;
