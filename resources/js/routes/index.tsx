import React from "react";
import {createBrowserRouter} from "react-router-dom";
import HomePage from "./HomePage";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import ProfileEditPage from "./ProfileEditPage";
import ProjectsPage from "./admin/ProjectsPage";
import ProfilePage from "./ProfilePage";
import BlogPostPage from "./Blog/BlogPostPage";
import BlogPostsPage from "./Blog/BlogPostsPage";
import ChatPage from "./ChatPage";
import AboutPage from "./AboutPage";
import SuggestionsPage from "./SuggestionsPage";
import UsersPage from "./UsersPage";
import NotFound from "./errors/NotFound";
import HHHPage from "./HHHPage";
import App from "../App";
import HAnimePage from "./HCollection/HAnime/HAnimePage";
import HMangaPage from "./HCollection/HManga/HMangaPage";
import HMangaDetailedPage from "./HCollection/HManga/HMangaDetailedPage";
import HReader from "./HCollection/HManga/HReader";
import HAnimeDetailedPage from "./HCollection/HAnime/HAnimeDetailedPage";
import IndexAdmin from "../routes/admin/index";
import Users from "./admin/Users";
import Tags from "./admin/Tags";
import Manga from "./admin/Manga";
import Studios from "./admin/Studios";
import AnimeCreate from "./admin/anime/AnimeCreate";
import AnimeEdit from "./admin/anime/AnimeEdit";
import Anime from "./admin/anime/Anime";
import Dashboard from "./admin/Dashboard";
import AnimeListPage from "./profile/AnimeListPage";
import ShikimoriAnime from "./admin/anime/ShikimoriAnime";
import ShikimoriHostfix from "routes/admin/anime/ShikimoriHostfix";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: 'registration', element: <RegistrationPage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'users', element: <UsersPage/>},
            {path: 'suggestions', element: <SuggestionsPage/>},
            {path: 'chat', element: <ChatPage/>},
            {
                path: 'profile',
                children: [
                    {
                        path: ':username',
                        children: [
                            {path: '', element: <ProfilePage/>},
                            {path: 'edit', element: <ProfileEditPage/>},
                            {path: 'animelist/:animestatus', element: <AnimeListPage/>}
                        ],
                    },
                ]
            },
            {
                path: 'blog',
                children: [
                    {path: '', element: <BlogPostsPage/>},
                    {path: ':id', element: <BlogPostPage/>},
                ]
            },
            {path: 'about', element: <AboutPage/>},
            {

                path: 'NULL/unit',
                children: [
                    {path: 'ZERO/:id', element: <HAnimeDetailedPage/>},
                    {path: 'ONE/:id', element: <HMangaDetailedPage/>},
                    {path: 'ONE/:id/read', element: <HReader/>},
                    {
                        path: '',
                        element: <HHHPage/>,
                        children: [
                            {
                                path: 'ZERO',
                                element: <HAnimePage/>,
                            },
                            {
                                path: 'ONE',
                                element: <HMangaPage/>,
                            },
                        ]
                    },
                ]
            },
        ]
    },
    {
        path: 'admin', element: <IndexAdmin/>,
        children: [
            {path: '', element: <Dashboard/>},
            {
                path: 'anime',
                children: [
                    {path: '', element: <Anime/>},
                    {path: 'studios', element: <Studios/>},
                    {path: 'new', element: <AnimeCreate/>},
                    {path: ':id', element: <AnimeEdit/>},
                ]
            },
            {
                path: 'manga', children: [
                    {path: '', element: <Manga/>},
                    {path: ':id', element: <Manga/>},
                ]
            },
            {path: 'users', element: <Users/>},
            {path: 'shikimori/anime', element: <ShikimoriAnime/>},
            {path: 'shikimori/hostfix', element: <ShikimoriHostfix/>},
            {path: 'tags', element: <Tags/>},
            {path: 'projects', element: <ProjectsPage/>},
        ]
    },
]);
