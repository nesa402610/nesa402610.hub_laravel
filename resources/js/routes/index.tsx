import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import ProfileEditPage from "./ProfileEditPage";
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
import HAnimePage from "./HAnime/HAnimePage";
import HAnimeDetailedPage from "./HAnime/HAnimeDetailedPage";
import UsersPage from "./UsersPage";
import NotFound from "./errors/NotFound";
import HMangaDetailedPage from "./HManga/HMangaDetailedPage";
import HHHPage from "./HHHPage";
import HMangaPage from "./HManga/HMangaPage";
import App from "../App";
import Loader from "../components/Loader";
import HReader from "./HManga/HReader";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<App/>}
      loader={Loader}
      errorElement={<NotFound/>}
    >
      <Route path={"/"} element={<HomePage/>}/>
      <Route path={"/suggestions"} element={<SuggestionsPage/>}/>
      <Route path={"/registration"} element={<RegistrationPage/>}/>
      <Route path={"/login"} element={<LoginPage/>}/>
      <Route path={"/profile"} element={<ProfilePage/>}>
        <Route path={":username"} element={<ProfilePage/>}/>
      </Route>
      <Route path={"/profile/edit"} element={<ProfileEditPage/>}/>
      <Route path={"/chat"} element={<ChatPage/>}/>
      <Route path={"/blog"} element={<BlogPage/>}>
        <Route path={""} element={<BlogPostsPage/>}/>
        <Route path={":id"} element={<BlogPostPage/>}/>
      </Route>
      <Route path={"/about"} element={<AboutPage/>}/>
      <Route path={"/admin/projects"} element={<ProjectsPage/>}/>
      <Route path={"/mini-apps"} element={<MiniApps/>}>
        <Route path={"timer"} element={<TimerApp/>}/>
      </Route>
      <Route path={"NULL"}>
        <Route path={""} element={<HHHPage/>}>
          <Route path={"a?"} element={<HAnimePage/>}/>
          <Route path={"m"} element={<HMangaPage/>}/>
        </Route>
        <Route path={"m/:id"} element={<HMangaDetailedPage/>}/>
        <Route path={"m/:id/reader"} element={<HReader/>}/>
        <Route path={"a/:id"} element={<HAnimeDetailedPage/>}/>
      </Route>
      <Route path={"users"} element={<UsersPage/>}/>
    </Route>
  )
);
