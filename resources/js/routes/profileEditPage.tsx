import React, {FC, useState} from 'react';
import {IUser} from "../types/types";
import Tabs from "../components/profilePage/tabs";
import AccountTab from "../components/profilePage/accountTab";
import ProfileTab from "../components/profilePage/profileTab";
import SecurityTab from "../components/profilePage/securityTab";
import {useAppSelector} from "../hooks/redux";

const ProfileEditPage: FC = () => {
    const user = useAppSelector(state => state.auth.user) as IUser
    const [isActive, setActive] = useState(0)
    if (!user) return null
    return (
        <div className={'p-4'}>
            <h1 className={'text-center text-2xl mb-4 font-bold'}>Профиль</h1>
            <Tabs setActive={setActive} isActive={isActive}/>
            {isActive === 0 && <AccountTab user={user}/>}
            {isActive === 1 && < ProfileTab user={user}/>}
            {isActive === 2 && < SecurityTab/>}
        </div>
    );
};

export default ProfileEditPage;
