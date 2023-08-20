import React, {FC, useState} from 'react';
import {useUpdateProfileMutation} from "services/userService";
import {IUser} from "types/User";

interface profileTabProps {
    user: IUser
}

const ProfileTab: FC<profileTabProps> = ({user}) => {
    const [updateProfile, {}] = useUpdateProfileMutation()
    const [userData, setUserData] = useState<IUser>(user);
    return (
        <div className={'block--dark sm:flex-col'}>
            <h2 className={'text-center text-xl'}>Профиль</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Имя
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, name: e.target.value})}
                           value={userData.name}
                           type={'text'}/>
                </label>
                <label>
                    Фамилия
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, lastName: e.target.value})}
                           value={userData.lastName}
                           type={'text'}/>
                </label>
                <label>
                    Отчество
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, middleName: e.target.value})}
                           value={userData.middleName}
                           type={'text'}/>
                </label>
                <label>
                    Статус
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, status: e.target.value})}
                           value={userData.status}
                           type={'text'}/>
                </label>
                <label>
                    Обо мне
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, about: e.target.value})}
                           value={userData.about}
                           type={'text'}/>
                </label>
                <label>
                    День рождения
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, birthday: e.target.value})}
                           value={userData.birthday}
                           type={'date'}/>
                </label>
                <label>
                    Изображение профиля <span className={'text-sm italic text-neutral-400'}>Изображение должно быть квадратным</span>
                    <input className={'bg-neutral-700'}
                           onChange={e => setUserData({...userData, avatar: e.target.value})}
                           value={userData.avatar}
                           type={'text'}/>
                </label>
                <button className={'bg-neutral-700'} onClick={() => updateProfile(userData)}>Обновить данные</button>
            </div>
        </div>
    );
};

export default ProfileTab;
