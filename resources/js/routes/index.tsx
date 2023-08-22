import React from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
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

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <HomePage/>},
            {path: 'suggestions', element: <SuggestionsPage/>},
            {path: 'registration', element: <RegistrationPage/>},
            {path: 'login', element: <LoginPage/>},
            {
                path: 'profile',
                element: <ProfilePage/>,
                children: [
                    {
                        path: ':username',
                        element: <ProfilePage/>,
                        children: [{
                            path: 'animelist/:animestatus',
                            element: <AnimeListPage/>
                        }]
                    },
                    {path: 'edit', element: <ProfileEditPage/>}
                ]
            },
            {path: 'chat', element: <ChatPage/>},
            {
                path: 'blog',
                element: <BlogPage/>,
                children: [
                    {path: '', element: <BlogPostsPage/>},
                    {path: ':id', element: <BlogPostPage/>},
                ]
            },
            {path: 'about', element: <AboutPage/>},
            {
                path: 'NULL',
                element: <Outlet/>,
                children: [
                    {
                        path: '', element: <HHHPage/>,
                        children: [
                            {
                                path: 'unit/ZERO',
                                element: <HAnimePage/>,
                                children: [{path: ':id', element: <HAnimeDetailedPage/>}]
                            },
                            {
                                path: 'unit/ONE',
                                element: <HMangaPage/>,
                                children: [
                                    {path: ':id', element: <HMangaDetailedPage/>},
                                    {path: ':id/read', element: <HReader/>},
                                ]
                            },
                        ]
                    },
                ]
            },
            {path: 'users', element: <UsersPage/>},
        ]
    },
    {
        path: 'admin', element: <IndexAdmin/>,
        children: [
            {path: '', element: <Dashboard/>},
            {
                path: 'anime', element: <Outlet/>, children: [
                    {path: '', element: <Anime/>},
                    {path: 'studios', element: <Studios/>},
                    {path: 'new', element: <AnimeCreate/>},
                    {path: ':id', element: <AnimeEdit/>},
                ]
            },
            {
                path: 'manga', element: <Outlet/>, children: [
                    {path: '', element: <Manga/>},
                    {path: ':id', element: <Manga/>},
                ]
            },
            {path: 'users', element: <Users/>},
            {path: 'shikimori/anime', element: <ShikimoriAnime/>},
            {path: 'tags', element: <Tags/>},
            {path: 'projects', element: <ProjectsPage/>},
        ]
    },
]);

// export const router = createBrowserRouter(
//     createRoutesFromElements(
//         <>
//             <Route
//                 path="/"
//                 element={<App/>}
//                 errorElement={<NotFound/>}>
//                 <Route path={"/"} element={<HomePage/>}/>
//                 <Route path={"/suggestions"} element={<SuggestionsPage/>}/>
//                 <Route path={"/registration"} element={<RegistrationPage/>}/>
//                 <Route path={"/login"} element={<LoginPage/>}/>
//                 <Route path={"/profile"} element={<ProfilePage/>}>
//                     <Route path={":username"} element={<ProfilePage/>}/>
//                 </Route>
//                 <Route path={'profile/:username/animelist/:animestatus'} element={<AnimeListPage/>}/>
//                 <Route path={"/profile/edit"} element={<ProfileEditPage/>}/>
//                 <Route path={"/chat"} element={<ChatPage/>}/>
//                 <Route path={"/blog"} element={<BlogPage/>}>
//                     <Route path={""} element={<BlogPostsPage/>}/>
//                     <Route path={":id"} element={<BlogPostPage/>}/>
//                 </Route>
//                 <Route path={"/about"} element={<AboutPage/>}/>
//                 {/*<Route path={"/mini-apps"} element={<MiniApps/>}>*/}
//                 {/*    <Route path={"timer"} element={<TimerApp/>}/>*/}
//                 {/*</Route>*/}
//                 <Route path={"NULL"} element={<Index/>}>
//                     <Route path={""} element={<HHHPage/>}>
//                         <Route path={"a"} element={<HAnimePage/>}/>
//                         <Route path={"m"} element={<HMangaPage/>}/>
//                     </Route>
//                     <Route path={"unit/ONE/:id"} element={<HMangaDetailedPage/>}/>
//                     <Route path={"unit/:id/reader"} element={<HReader/>}/>
//                     <Route path={"unit/ZERO/:id"} element={<HAnimeDetailedPage/>}/>
//                 </Route>
//                 <Route path={"users"} element={<UsersPage/>}/>
//             </Route>
//             <Route path={"admin"}
//                    element={<IndexAdmin/>}>
//                 <Route path={""} element={<Dashboard/>}/>
//                 <Route path={"anime"} element={<Outlet/>}>
//                     <Route path={""} element={<Anime/>}/>
//                     <Route path={"studios"} element={<Studios/>}/>
//                     <Route path={"new"} element={<AnimeCreate/>}/>
//                     <Route path={":id"} element={<AnimeEdit/>}/>
//                 </Route>
//                 <Route path={"manga"} element={<Outlet/>}>
//                     <Route path={""} element={<Manga/>}/>
//                     <Route path={":id"} element={<Manga/>}/>
//                 </Route>
//                 <Route path={"users"} element={<Users/>}/>
//                 <Route path={"shikimori/anime"} element={<ShikimoriAnime/>}/>
//                 <Route path={"tags"} element={<Tags/>}/>
//                 <Route path={"projects"} element={<ProjectsPage/>}/>
//             </Route>
//         </>
//     )
// );
