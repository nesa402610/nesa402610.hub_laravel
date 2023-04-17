import React from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from "react-router-dom";
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
import UsersPage from "./UsersPage";
import NotFound from "./errors/NotFound";
import HHHPage from "./HHHPage";
import App from "../App";
import HAnimePage from "./HCollection/HAnime/HAnimePage";
import HMangaPage from "./HCollection/HManga/HMangaPage";
import HMangaDetailedPage from "./HCollection/HManga/HMangaDetailedPage";
import HReader from "./HCollection/HManga/HReader";
import HAnimeDetailedPage from "./HCollection/HAnime/HAnimeDetailedPage";
import Index from "./HCollection";
import IndexAdmin from "../routes/admin/index";
import Anime from "./admin/Anime";
import Users from "./admin/Users";
import Tags from "./admin/Tags";
import Manga from "./admin/Manga";
import AnimeEdit from "../components/admin/Collections/Anime/AnimeEdit";

export const router = createBrowserRouter(
  createRoutesFromElements(<>
      <Route
        path="/"
        element={<App/>}
        errorElement={<NotFound/>}>
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
        <Route path={"NULL"} element={<Index/>}>
          <Route path={""} element={<HHHPage/>}>
            <Route path={"a"} element={<HAnimePage/>}/>
            <Route path={"m"} element={<HMangaPage/>}/>
          </Route>
          <Route path={"m/:id"} element={<HMangaDetailedPage/>}/>
          <Route path={"m/:id/reader"} element={<HReader/>}/>
          <Route path={"a/:id"} element={<HAnimeDetailedPage/>}/>
        </Route>
        <Route path={"users"} element={<UsersPage/>}/>
      </Route>
      <Route path={"admin"}
             element={<IndexAdmin/>}>
        <Route path={"anime"} element={<Outlet/>}>
          <Route path={""} element={<Anime/>}/>
          <Route path={":id"} element={<AnimeEdit/>}/>
        </Route>
        <Route path={"manga"} element={<Outlet/>}>
          <Route path={""} element={<Manga/>}/>
          <Route path={":id"} element={<Manga/>}/>
        </Route>
        <Route path={"users"} element={<Users/>}/>
        <Route path={"tags"} element={<Tags/>}/>
      </Route>
    </>
  )
);
