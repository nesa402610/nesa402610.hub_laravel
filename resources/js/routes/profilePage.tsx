import React, {useEffect, useState} from 'react';
import BgCard from "../components/bgCard";
import {Link} from "react-router-dom";
import {IoSettingsSharp} from "react-icons/io5";
import {IUser} from "../types/types";
import FgCard from "../components/fgCard";
import moment from "moment";
import {useParams} from "react-router";
import axios from "axios";
import {useAppSelector} from "../hooks/redux";

const ProfilePage = () => {
    const authedUser = useAppSelector(state => state.auth.user) as IUser
    const [user, setUser] = useState<IUser>(null)
    const userName = useParams()

    useEffect(() => {
        // @ts-ignore
        if (authedUser?.id == userName.username || !userName) {
            return setUser(authedUser)
        } else {
            axios.get('/profile/' + userName.username)
                .then(r => {
                    setUser(r.data)
                })
        }

    }, [userName])


    if (user) return (
        <div className={'p-4'}>
            <BgCard>
                <div className={'flex sm:flex-row xs:flex-col gap-4 w-full'}>
                    <div className={'flex xs:items-center flex-col gap-2 sm:items-end'}>
                        <img className={'rounded-lg'}
                             width={'200px'}
                             height={'200px'}
                             src={user.avatar}
                             alt="user profile picture"/>
                        <Link to={'edit'}
                              className={'hover:text-stone-400 transition-colors flex gap-2 text-2xl items-center'}>
                            <span className={'text-lg'}>Настройки</span>
                            <IoSettingsSharp/>
                        </Link>
                    </div>
                    <div className={'flex flex-col gap-8 flex-1'}>
                        <div>
                            <div>
                                {user.name} {user.lastName} {user.middleName}
                            </div>
                            <div>
                                {user.birthday &&
                                    (moment(user.birthday).format('YYYY')) + ' года / '}
                                {user.status && user.status + ' / '} Здесь
                                                                     с {moment(user.created_at).format('YYYY')} года
                            </div>
                        </div>
                        <div className={'flex flex-col flex-1'}>
                            <h2 className={'font-bold mb-2 italic text-end mr-2'}>Информация обо мне</h2>
                            <FgCard className={'shadow-md'}>
                                {user.about}
                            </FgCard>
                        </div>
                    </div>
                </div>
            </BgCard>
        </div>
    );
};

export default ProfilePage;
