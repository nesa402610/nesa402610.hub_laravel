import React, {FC} from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";
import {useDispatch} from "react-redux";
import axios from "axios";
import {IUser} from "../../types/types";
import SubmitButton from "../UI/submitButton";
import {updateProfile} from "../../store/reducers/authSlice";

interface profileTabProps {
    user: IUser
}

const ProfileTab: FC<profileTabProps> = ({user}) => {
    const dispatch = useDispatch()
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
        <FgCard>
            <h2 className={'text-center text-xl'}>Профиль</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Имя
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, name: e.target.value}))}
                           value={user.name}
                           type={'text'}/>
                </label>
                <label>
                    Фамилия
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, lastName: e.target.value}))}
                           value={user.lastName}
                           type={'text'}/>
                </label>
                <label>
                    Отчество
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, middleName: e.target.value}))}
                           value={user.middleName}
                           type={'text'}/>
                </label>
                <label>
                    Статус
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, status: e.target.value}))}
                           value={user.status}
                           type={'text'}/>
                </label>
                <label>
                    Обо мне
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, about: e.target.value}))}
                           value={user.about}
                           type={'text'}/>
                </label>
                <label>
                    День рождения
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfile({...user, birthday: e.target.value}))}
                           value={user.birthday}
                           type={'date'}/>
                </label>
                <label>
                    Изображение профиля <span className={'text-sm italic text-stone-400'}>Изображение должно быть квадратным</span>
                    <Input onChange={e=>dispatch(updateProfile({...user, avatar: e.target.value}))} bg={'bg-stone-600'} value={user.avatar} type={'text'}/>
                </label>
                <SubmitButton onClick={updateProfileHandler}>Обновить данные </SubmitButton>
            </div>
        </FgCard>
    );
};

export default ProfileTab;
