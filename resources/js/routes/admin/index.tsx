import React from "react";
import {Link, NavLink, Outlet} from "react-router-dom";

const Index = () => {
  return (
    <div className={"flex gap-4"}>
      <aside className={"fixed flex flex-col p-4 bg-slate-800 w-[300px] h-full"}>
        <Link to={"/"}>На основной сайт</Link>
        <h2 className={"font-bold border-b mb-4"}>Таблицы</h2>
        <menu className={"flex flex-col gap-4"}>
          <NavLink to={"users"}
                   className={" p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
            Users
          </NavLink>
          <NavLink to={"tags"}
                   className={"p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
            Tags
          </NavLink>
          <NavLink to={"manga"}
                   className={"p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
            Manga
          </NavLink>
          <NavLink to={"anime"}
                   className={"p-2 rounded-lg bg-slate-700 hover:scale-105 hover:bg-slate-600 transition-all"}>
            Anime
          </NavLink>
        </menu>
      </aside>
      <main className={"ml-[310px] bg-slate-800 flex-1 p-4 overflow-scroll"}>
        <Outlet/>
      </main>
    </div>
  );
};

export default Index;
