import React, {FC, useState} from 'react';
import {BiSolidDownArrow} from "react-icons/bi";
import NavItem from "components/Dashboard/Navbar/NavItem";

interface NavGroupProps {
    title: string
    items: {
        name: string
        to: string
    }[]
}

const NavGroup: FC<NavGroupProps> = ({title, items}) => {
    const openStatus = JSON.parse(localStorage.getItem(`DOS${title}`)) as boolean
    const [open, setOpen] = useState<boolean>(openStatus);

    const changeOpenStatus = () => {
        localStorage.setItem(`DOS${title}`, JSON.stringify(!open))
        setOpen(prev => !prev)
    }
    return (
        <div className={'bg-slate-700 p-2 rounded-lg'}>
            <span className={'cursor-pointer text-xl font-bold flex items-center justify-between'}
                  onClick={changeOpenStatus}>
                {title} <BiSolidDownArrow className={`${open ? 'rotate-180' : ''} transition-all text-base`}/>
            </span>
            <div
                className={`${open ? 'max-h-[300px] pt-2' : 'max-h-0'} ease-out duration-200 overflow-y-clip transition-all] flex flex-col gap-2`}>
                {items.map(({to, name}) => (
                    <NavItem key={name} to={to} name={name}/>
                ))}
            </div>
        </div>
    );
};

export default NavGroup;
