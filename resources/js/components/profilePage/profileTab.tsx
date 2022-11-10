import React, {FC} from 'react';
import axios from "axios";
import {IUser} from "../../types/types";
import SubmitButton from "../UI/submitButton";
import {updateProfile} from "../../store/reducers/authSlice";
import {useAppDispatch} from "../../hooks/redux";

interface profileTabProps {
    user: IUser
}

const ProfileTab: FC<profileTabProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const updateProfileHandler = () => {
        axios.post('edit/updateProfile',
            {
                name: user.name,
                middleName: user.middleName,
                lastName: user.lastName,
                birthday: user.birthday,
                avatar: user.avatar,
                status: user.status,
                about: user.about,

            })
            .then(r => {
                dispatch(updateProfile(r.data))
            })
            .catch(err =>
                console.log(err))
    }
    return (
        <div className={'block--light sm:flex-col'}>
            <h2 className={'text-center text-xl'}>Профиль</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Имя
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, name: e.target.value}))}
                           value={user.name}
                           type={'text'}/>
                </label>
                <label>
                    Фамилия
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, lastName: e.target.value}))}
                           value={user.lastName}
                           type={'text'}/>
                </label>
                <label>
                    Отчество
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, middleName: e.target.value}))}
                           value={user.middleName}
                           type={'text'}/>
                </label>
                <label>
                    Статус
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, status: e.target.value}))}
                           value={user.status}
                           type={'text'}/>
                </label>
                <label>
                    Обо мне
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, about: e.target.value}))}
                           value={user.about}
                           type={'text'}/>
                </label>
                <label>
                    День рождения
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateProfile({...user, birthday: e.target.value}))}
                           value={user.birthday}
                           type={'date'}/>
                </label>
                <label>
                    Изображение профиля <span className={'text-sm italic text-stone-400'}>Изображение должно быть квадратным</span>
                    <input onChange={e => dispatch(updateProfile({...user, avatar: e.target.value}))}
                           className={'bg-stone-700'}
                           value={user.avatar}
                           type={'text'}/>
                </label>
                <SubmitButton className={'bg-stone-700'} onClick={updateProfileHandler}>Обновить данные </SubmitButton>
            </div>
        </div>
    );
};

export default ProfileTab;
