import React from 'react';
import {Link, NavLink} from "react-router-dom";
import axios from "axios";

const AdminSidebar = () => {
    const sendMail = () => {
        axios.post('mail')
    };
    const NavLinks = [
        {name: 'Обзор', to: ''},
        {name: 'Пользователи', to: 'users'},
        {name: 'Тэги', to: 'tags'},
        {name: 'Манга', to: 'manga'},
        {name: 'Аниме', to: 'anime'},
        {name: 'Аниме студии', to: 'anime/studios'},
        {name: 'DevProjects', to: 'projects'},
    ]
    return (
        <aside className={"fixed flex flex-col p-4 bg-slate-800 w-[300px] h-full"}>
            <Link to={"/"}>На основной сайт</Link>
            <h2 className={"font-bold border-b mb-4"}>Таблицы</h2>
            <menu className={"flex flex-col gap-4"}>
                {NavLinks.map(({to, name}) =>
                    <NavLink to={to}
                             className={" p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
                        {name}
                    </NavLink>
                )}
                <span onClick={sendMail}
                      className={" p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
                      Тестовый email
                </span>
            </menu>
        </aside>
    )
        ;
};

export default AdminSidebar;
