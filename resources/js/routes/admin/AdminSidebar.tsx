import React from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import NavGroup from "components/Dashboard/Navbar/NavGroup";

const AdminSidebar = () => {
    const sendMail = () => {
        axios.post('mail')
    };
    const NavLinks = [
        {
            groupName: 'Коллекции',
            items: [
                {name: 'Аниме', to: 'anime'},
                {name: 'Тэги', to: 'tags'},
                {name: 'Аниме студии', to: 'anime/studios'},
                {name: 'Манга', to: 'manga'},
                {name: 'Shikimori Anime', to: 'shikimori/anime'},
            ]
        },
        {
            groupName: 'Общее',
            items: [
                {name: 'Обзор', to: ''},
                {name: 'Пользователи', to: 'users'},
                {name: 'DevProjects', to: 'projects'},
            ]
        },
    ]
    return (
        <aside className={"fixed flex flex-col p-4 bg-slate-800 w-[300px] h-full"}>
            <Link to={"/"}>На основной сайт</Link>
            <h2 className={"font-bold border-b mb-4"}>Таблицы</h2>
            <menu className={"flex flex-col gap-4"}>
                {NavLinks.map(({groupName, items}) =>
                    <NavGroup key={groupName} items={items} title={groupName}/>
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
