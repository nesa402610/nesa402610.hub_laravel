import React, {FC} from "react";
import {Outlet, useNavigate} from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import {useGetUserQuery} from "../../services/userService";

const Index: FC = () => {
    const {data: user} = useGetUserQuery()
    const nav = useNavigate()
    if (user?.role[0]?.name !== 'Admin') {
        nav('/');
    }
    return (
        <div className={"flex gap-4"}>
            <AdminSidebar/>
            <main className={"ml-[310px] bg-slate-800 flex-1 min-h-screen p-4 overflow-scroll"}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Index;
