import React from "react";
import Header from "./components/header";
import "./App.css";
import {Outlet} from "react-router";
import {ScrollRestoration} from "react-router-dom";
import {useGetUserQuery} from "./services/userService";
import Loader from "./components/Loader";
import {useAppSelector} from "./hooks/redux";
import MangaHeader from "./components/HManga/MangaHeader";

const App = () => {
    const {isFetching, error} = useGetUserQuery()
    const {headerType} = useAppSelector(state => state.app)
    if (isFetching && !error) return <Loader/>
    return (
        <>
            {headerType ? <MangaHeader/> : <Header/>}
            <main className={"ml-[80px]"}>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    );
};

export default App;
