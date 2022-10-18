import React, {FC, useState} from 'react';
import {IUser} from "../types/types";
import {useTypedSelector} from "../hooks/useTypedSelector";
import BgCard from "../components/bgCard";
import Tabs from "../components/profilePage/tabs";
import AccountTab from "../components/profilePage/accountTab";
import ProfileTab from "../components/profilePage/profileTab";
import SecurityTab from "../components/profilePage/securityTab";

const ProfileEditPage: FC = () => {
    const user = useTypedSelector(state => state.auth.user) as IUser
    const [isActive, setActive] = useState(0)
    if (!user) return null
    return (
        <div className={'p-4'}>
            <h1 className={'text-center text-2xl mb-4 font-bold'}>Профиль</h1>
            <Tabs setActive={setActive} isActive={isActive}/>
            <BgCard>
                {isActive === 0 && <AccountTab user={user}/>}
                {isActive === 1 && < ProfileTab user={user}/>}
                {isActive === 2 && < SecurityTab/>}
            </BgCard>
        </div>
    );
};

export default ProfileEditPage;
