import React, {FC} from 'react';
import {NavLink} from 'react-router-dom';
import {FaGithub, FaSteam, FaTelegram, FaTwitch, FaTwitter, FaVk} from "react-icons/fa";
import {SiOsu, SiShikimori} from "react-icons/si";
import MyLinkItem from "./UI/myLinkItem";
import CreateProjectModal from './admin/createProjectModal';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setModal} from "../store/reducers/modalSlice";

interface linksProps {
    name: string;
    url: string;
    ico: any;
}

const Header: FC = () => {
    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

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
        dispatch(setModal({
            title: 'Добавление проекта',
            children: <CreateProjectModal/>
        }))
    }
    return (
        <header>
            <div className={'flex flex-col gap-2 md:flex-row justify-between p-4 items-center'}>
                <nav className="flex gap-4 lg:basis-1/3">
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to='/'>Overview</NavLink>
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to={'/roadmap'}>Roadmap</NavLink>
                    <NavLink className={'flex hover:text-stone-400 transition-colors'} to={'/blog'}>Blog</NavLink>
                    {/*<NavLink className={'flex hover:text-stone-400 transition-colors'} to={'/about'}>About</NavLink>*/}
                </nav>
                <div className={'flex flex-1 gap-4 lg:basis-1/3 justify-center items-center'}>
                    {!user ?
                        <>
                            <NavLink className={'flex hover:text-stone-400 transition-colors'}
                                     to={'/login'}>Login</NavLink>
                            <NavLink className={'flex hover:text-stone-400 transition-colors'}
                                     to={'/registration'}>Registration</NavLink>
                        </>
                        :
                        <>
                            <NavLink className={'flex items-center hover:text-stone-400 transition-colors'}
                                     to={'/profile/'+user.id}>
                                <span>Profile</span>
                                <img className={'rounded-lg ml-1'} width={'30px'} height={'30px'} src={user.avatar} alt=""/>
                            </NavLink>
                        </>

                    }
                    {user?.id === 1 && <>
                        <span className={'cursor-pointer flex items-center hover:text-stone-400 transition-colors'} onClick={createProjectHandler}>CreateProject</span>
                        <NavLink className={'flex items-center hover:text-stone-400 transition-colors'} to={'/admin/projects'}>Projects</NavLink>
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
