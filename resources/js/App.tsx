import React from "react";
import Header from "./components/header";
import "./App.css";
import "./API/axios";
import {Outlet} from "react-router";
import {ScrollRestoration} from "react-router-dom";

const App = () => {
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
