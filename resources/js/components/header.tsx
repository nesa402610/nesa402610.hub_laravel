import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {FaGithub, FaTelegram, FaVk, FaTwitch, FaSteam, FaTwitter} from "react-icons/fa";
import {SiOsu, SiShikimori} from "react-icons/si";
import MyLinkItem from "./UI/myLinkItem";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {IUser} from "../types/types";
import {useDispatch} from "react-redux";
import {setModalAction} from "../store/modalReducer";
import CreateProjectModal from './admin/createProjectModal';

interface linksProps {
    name: string;
    url: string;
    ico: any;
}

const Header: FC = () => {
    const user = useTypedSelector(state => state.auth.user) as IUser
    const dispatch = useDispatch()

    const links: linksProps[] = [
        {
            name: 'GitHub',
            url: 'https://github.com/nesa402610',
            ico: <FaGithub/>,
        }, {
            name: 'Telegram',
            url: 'https://t.me/nesa402610',
            ico: <FaTelegram/>,
        }, {
            name: 'VK',
            url: 'https://vk.com/nesa402610',
            ico: <FaVk/>,
        }, {
            name: 'Twitch',
            url: 'https://www.twitch.tv/nesa402610',
            ico: <FaTwitch/>,
        }, {
            name: 'Shikimori',
            url: 'https://shikimori.one/%E1%A0%8C+%E1%A0%8C+%E1%A0%8C%E1%A0%8C+%E1%A0%8C',
            ico: <SiShikimori/>,
        },
        {
            name: 'Steam',
            url: 'https://steamcommunity.com/id/nesa402610',
            ico: <FaSteam/>,
        }, {
            name: 'OSU! Gatari',
            url: 'https://osu.gatari.pw/u/11971',
            ico: <SiOsu/>,
        },
        {
            name: 'twitter',
            url: 'https://twitter.com/nesa402610',
            ico: <FaTwitter/>
        }
    ];
    const createProjectHandler = () => {
        dispatch(setModalAction({title: 'Добавление проекта',
            children: <CreateProjectModal/>
        }))
    }
    return (
        <header>
            <div className={'flex flex-col gap-2 md:flex-row justify-between p-4 items-center'}>
                <nav className="flex gap-4 lg:basis-1/3">
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to='/'>Overview</NavLink>
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to={'/roadmap'}>Roadmap</NavLink>
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to={'/about'}>About</NavLink>
                </nav>
                <div className={'flex flex-1 gap-4 lg:basis-1/3 justify-center'}>
                    {!user ?
                        <>
                            <NavLink className={'flex hover:text-stone-400 transition-colors'}
                                     to={'/login'}>Login</NavLink>
                            <NavLink className={'flex hover:text-stone-400 transition-colors'}
                                     to={'/registration'}>Registration</NavLink>
                        </>
                        :
                        <>
                            <NavLink className={'flex hover:text-stone-400 transition-colors'}
                                     to={'/profile'}>Profile</NavLink>
                        </>

                    }
                    {user?.id === 1 && <>
                        <span onClick={createProjectHandler}>CreateProject</span>
                        <NavLink to={'/admin/projects'}>Projects</NavLink>
                    </>}
                </div>
                <div className={'flex gap-2 lg:basis-1/3 justify-end'}>
                    {links.map(link =>
                        <MyLinkItem key={link.name} link={link}/>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
