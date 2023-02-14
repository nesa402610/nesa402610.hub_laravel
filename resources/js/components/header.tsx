import React, {FC, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {FaGithub, FaSteam, FaTelegram, FaTwitch, FaTwitter, FaVk} from "react-icons/fa";
import {SiOsu, SiShikimori} from "react-icons/si";
import MyLinkItem from "./UI/myLinkItem";
import CreateProjectModal from './admin/createProjectModal';
import {IoBookmarks, IoChatbox, IoGrid, IoHome, IoNewspaper, IoPerson} from "react-icons/io5";
import {useGetUserQuery} from "../services/userService";
import Modal from "./UI/modal";

interface linksProps {
    name: string;
    url: string;
    ico: any;
}

const Header: FC = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const {data, error, isLoading} = useGetUserQuery('');

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
    return (
        <>
            {isModal && <Modal title={'Добавление проекта'} closeHandler={() => setIsModal(false)}>
                <CreateProjectModal closeModalHandler={() => setIsModal(false)}/>
            </Modal>

            }
            <header>
                <div className={'flex flex-col gap-2 md:flex-row justify-between p-4 items-center'}>
                    <nav className="flex gap-4 lg:basis-auto">
                        <NavLink className={'nav-link'} to='/'>
                            <IoHome/>
                            Главная
                        </NavLink>
                        <NavLink className={'nav-link'} to={'/suggestions'}>
                            <IoBookmarks/>
                            Задачи
                        </NavLink>
                        <NavLink className={'nav-link'} to={'/blog'}>
                            <IoNewspaper/>
                            Блог
                        </NavLink>
                        <NavLink className={'nav-link'} to={'/chat'}>
                            <IoChatbox/>
                            Чат
                        </NavLink>
                        <NavLink className={'nav-link whitespace-nowrap'} to={'/about'}>
                            <IoPerson/>
                            <span>Обо мне</span>
                        </NavLink>
                        <NavLink className={'nav-link'} to={'/mini-apps'}>
                            <IoGrid/>
                            Apps
                        </NavLink>
                    </nav>
                    <div className={'flex flex-1 gap-4 lg:basis-1/3 justify-center items-center'}>
                        {!data ?
                            <>
                                <NavLink className={'nav-link'}
                                         to={'/login'}>Login</NavLink>
                                <NavLink className={'nav-link'}
                                         to={'/registration'}>Registration</NavLink>
                            </>
                            :
                            <>
                                <NavLink className={'nav-link'}
                                         to={'/profile/' + data.id}>
                                    <span>Профиль</span>
                                    <img className={'rounded-lg'}
                                         width={'30px'}
                                         height={'30px'}
                                         src={data.avatar}
                                         alt=""/>
                                </NavLink>
                            </>

                        }
                        {data?.id === 1 && <>
                        <span className={'cursor-pointer flex items-center hover:text-stone-400 transition-colors'}
                              onClick={() => setIsModal(true)}>CreateProject</span>
                            <NavLink className={'flex items-center hover:text-stone-400 transition-colors'}
                                     to={'/admin/projects'}>Projects</NavLink>
                        </>}
                    </div>
                    <div className={'flex gap-2 lg:basis-1/3 justify-end'}>
                        {links.map(link =>
                            <MyLinkItem key={link.name} link={link}/>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
