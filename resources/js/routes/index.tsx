import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./homePage";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import ProfileEditPage from "./profileEditPage";
import AccessDenied from "./errors/accessDenied";
import {IUser} from "../types/types";
import ProjectsPage from "./admin/ProjectsPage";
import ProfilePage from "./profilePage";
import {useAppSelector} from "../hooks/redux";
import BlogPage from "./Blog/BlogPage";
import BlogPostPage from "./Blog/blogPostPage";
import BlogPostsPage from "./Blog/BlogPostsPage";
import ChatPage from "./ChatPage";
import AboutPage from "./AboutPage";
import SuggestionsPage from "./SuggestionsPage";

const Index: FC = () => {
    const user = useAppSelector(state => state.auth.user) as IUser
    return (
        <>
            <Routes>
                <Route path={'/'} element={<HomePage/>}/>
                <Route path={'/suggestions'} element={<SuggestionsPage/>}/>
                <Route path={'/registration'} element={<RegistrationPage/>}/>
                <Route path={'/login'} element={<LoginPage/>}/>
                <Route path={'/profile'} element={<ProfilePage/>}>
                    <Route path={':username'} element={<ProfilePage/>}/>
                </Route>
                <Route path={'/profile/edit'} element={<ProfileEditPage/>}/>
                <Route path={'/chat'} element={<ChatPage/>}/>
                <Route path={'/blog'} element={<BlogPage/>}>
                    <Route path={''} element={<BlogPostsPage/>}/>
                    <Route path={':id'} element={<BlogPostPage/>}/>
                </Route>
                <Route path={'/about'} element={<AboutPage/>} />
                <Route path={'/admin/projects'} element={user?.id === 1 ? <ProjectsPage/> : <AccessDenied/>}/>

            </Routes>

        </>
    );
};

export default Index;
