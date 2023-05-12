import React from "react";
import Header from "./components/header";
import "./App.css";
import "./API/axios";
import {Outlet} from "react-router";
import {ScrollRestoration} from "react-router-dom";
import {useGetUserQuery} from "./services/userService";
import Loader from "./components/Loader";

const App = () => {
    const {data, isFetching, error} = useGetUserQuery()
    if (isFetching && !error) return <Loader/>
    return (
        <>
            <Header/>
            <main className={"ml-[80px]"}>
                <Outlet/>
                <ScrollRestoration/>
            </main>
        </>
    );
};

export default App;
