import React, {FC} from 'react';
import {NavLink} from "react-router-dom";

interface NavItemProps {
    to: string
    name: string
}

const NavItem: FC<NavItemProps> = ({to, name}) => {
    return (
        <NavLink to={to}
                 className={"p-2 rounded-lg bg-slate-800 hover:scale-105 hover:bg-slate-900 transition-all"}>
            {name}
        </NavLink>
    );
};

export default NavItem;
