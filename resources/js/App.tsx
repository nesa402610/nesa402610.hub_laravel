import React, {useEffect, useState} from "react";
import "./App.css";
import {Outlet} from "react-router";
import {ScrollRestoration} from "react-router-dom";
import {useGetUserQuery} from "services/userService";
import Loader from "components/Loader";
import {useAppSelector} from "hooks/redux";
import MangaHeader from "./components/HManga/MangaHeader";
import Header from "components/header";

const App = () => {
    const {isFetching, error} = useGetUserQuery()
    const {headerType} = useAppSelector(state => state.app)
    const [start, setStart] = useState(true);

    useEffect(() => {
        if (!isFetching) setTimeout(() => setStart(false), 100)

    }, [isFetching]);

    if (isFetching && !error) return <Loader/>
    return (
        <>
            {headerType ? <MangaHeader/> : <Header/>}
            <main className={`${start ? 'ml-0' : 'ml-[80px]'} transition-all`}>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    );
};

export default App;
