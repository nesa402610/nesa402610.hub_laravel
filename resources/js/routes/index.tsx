import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import ProfileEditPage from "./ProfileEditPage";
import AccessDenied from "./errors/accessDenied";
import ProjectsPage from "./admin/ProjectsPage";
import ProfilePage from "./ProfilePage";
import BlogPage from "./Blog/BlogPage";
import BlogPostPage from "./Blog/BlogPostPage";
import BlogPostsPage from "./Blog/BlogPostsPage";
import ChatPage from "./ChatPage";
import AboutPage from "./AboutPage";
import SuggestionsPage from "./SuggestionsPage";
import MiniApps from "./miniApps/index";
import TimerApp from "./miniApps/Timer/App";
import {useGetUserQuery} from "../services/userService";
import HCollectionPage from "./HCollectionPage";

const Index: FC = () => {
  const {data: user} = useGetUserQuery('');
  return (
    <div className={'ml-[80px]'}>
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
        <Route path={'/about'} element={<AboutPage/>}/>
        <Route path={'/admin/projects'} element={user?.id === 1 ? <ProjectsPage/> : <AccessDenied/>}/>
        <Route path={'/mini-apps'} element={<MiniApps/>}>
          <Route path={'timer'} element={<TimerApp/>}/>
        </Route>
        <Route path={'NULL'} element={<HCollectionPage/>}/>
      </Routes>

    </div>
  );
};

export default Index;
