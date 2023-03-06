import React, {FC, useState} from 'react';
import AccountTab from "../components/profilePage/accountTab";
import ProfileTab from "../components/profilePage/profileTab";
import SecurityTab from "../components/profilePage/securityTab";
import Tabs from "../components/UI/Tabs";
import {useGetUserQuery} from "../services/userService";
import Loader from "../components/Loader";

const ProfileEditPage: FC = () => {
    const {data: user} = useGetUserQuery('')
    const [isActive, setActive] = useState(0)
    if (!user) return <Loader/>
    return (
        <div className={'p-4 flex flex-col gap-4'}>
            <h1 className={'text-center text-2xl mb-4 font-bold'}>Профиль</h1>
            <Tabs titles={['Аккаунт', 'Профиль', 'Безопасность']} setTab={setActive} tab={isActive}/>
            {isActive === 0 && <AccountTab user={user}/>}
            {isActive === 1 && < ProfileTab user={user}/>}
            {isActive === 2 && < SecurityTab/>}
        </div>
    );
};

export default ProfileEditPage;
