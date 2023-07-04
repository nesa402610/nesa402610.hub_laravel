import React from "react";
import {Outlet} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const Index = () => {

    return (
        <div className={"flex gap-4"}>
            <AdminSidebar/>
            <main className={"ml-[310px] bg-slate-800 flex-1 min-h-screen min-h-screen p-4 overflow-scroll"}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Index;
