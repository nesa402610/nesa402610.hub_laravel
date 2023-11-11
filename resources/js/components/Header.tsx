import React, {FC, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import MyLinkItem from "./UI/myLinkItem";
import {IoBookmarks, IoChatbox, IoHome, IoNewspaper, IoPerson} from "react-icons/io5";
import {useGetUserQuery} from "services/userService";
import Modal from "./UI/modal";
import ProjectModal from "./admin/ProjectModal";
import {links} from "../mockData";
import {GiCentaurHeart} from "react-icons/gi";


const Header: FC = () => {
    const [isModal, setIsModal] = useState<boolean>(false);
    const {data, error, isLoading} = useGetUserQuery();
    const [start, setStart] = useState(true);
    useEffect(() => {
        setTimeout(() => setStart(false), 100)
    }, []);
    return (
        <>
            <Modal title={"Добавление проекта"} isOpen={isModal} onClose={setIsModal}>
                <ProjectModal type={"create"} closeModalHandler={setIsModal}/>
            </Modal>
            <header
                className={`transition-all bg-neutral-800 w-[80px] fixed z-50 h-full top-0 ${start ? 'left-[-80px]' : 'left-0'}`}>
                <div className={"flex flex-col items-center gap-2 justify-between py-4 px-2"}>
                    <nav className="flex flex-col gap-4 lg:basis-auto">
                        <NavLink className={"nav-link"} to="/">
                            <IoHome/>
                            Главная
                        </NavLink>
                        <NavLink className={"nav-link"} to={"/suggestions"}>
                            <IoBookmarks/>
                            Задачи
                        </NavLink>
                        <NavLink className={"nav-link"} to={"/blog"}>
                            <IoNewspaper/>
                            Блог
                        </NavLink>
                        <NavLink className={"nav-link"} to={"/chat"}>
                            <IoChatbox/>
                            Чат
                        </NavLink>
                        <NavLink className={"nav-link whitespace-nowrap"} to={"/about"}>
                            <IoPerson/>
                            <span>Обо мне</span>
                        </NavLink>
                        <NavLink className={"nav-link whitespace-nowrap"} to={"/users"}>
                            <IoPerson/>
                            <span>Юзеры</span>
                        </NavLink>
                        {/*<NavLink className={'nav-link'} to={'/mini-apps'}>*/}
                        {/*  <IoGrid/>*/}
                        {/*  Apps*/}
                        {/*</NavLink>    */}
                        <NavLink className={"nav-link"} to={"/NULL/unit/ZERO"}>
                            <GiCentaurHeart size={"2rem"}/>
                            <span>Аниме</span>
                        </NavLink>
                    </nav>
                    <hr className={"bg-neutral-400 h-[2px]  w-full"}/>
                    <div className={"flex flex-col gap-4 lg:basis-1/3 justify-center items-center"}>
                        {!data ?
                            <>
                                <NavLink className={"nav-link"}
                                         to={"/login"}>Login</NavLink>
                                <NavLink className={"nav-link"}
                                         to={"/registration"}>Registration</NavLink>
                            </>
                            :
                            <>
                                <NavLink className={"nav-link"}
                                         to={"/profile/" + data.id}>
                                    <img className={"rounded-lg"}
                                         width={"30px"}
                                         height={"30px"}
                                         src={data.avatar}
                                         alt=""/>
                                    <span>{data.name}</span>
                                </NavLink>
                            </>

                        }
                        {(data?.id === 1 || data?.id === 3) &&
                            <>
                                <NavLink className={"flex items-center hover:text-neutral-400 transition-colors"}
                                         to={"/admin/"}>dashboard</NavLink>
                            </>
                        }
                    </div>
                    <hr className={"bg-neutral-400 h-[2px]  w-full"}/>

                    <div className={"flex flex-wrap gap-2 lg:basis-1/3 justify-end"}>
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
