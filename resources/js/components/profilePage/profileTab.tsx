import React, {FC} from 'react';
import Input from "../UI/input";
import {updateProfileAction} from "../../store/authReducer";
import FgCard from "../fgCard";
import {useDispatch} from "react-redux";
import axios from "axios";
import {IUser} from "../../types/types";
import SubmitButton from "../UI/submitButton";

interface profileTabProps {
    user: IUser
}

const ProfileTab: FC<profileTabProps> = ({user}) => {
    const dispatch = useDispatch()
    const updateProfile = () => {
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
                dispatch(updateProfileAction(r.data))
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
                           onChange={e => dispatch(updateProfileAction({...user, name: e.target.value}))}
                           value={user.name}
                           type={'text'}/>
                </label>
                <label>
                    Фамилия
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfileAction({...user, lastName: e.target.value}))}
                           value={user.lastName}
                           type={'text'}/>
                </label>
                <label>
                    Отчество
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfileAction({...user, middleName: e.target.value}))}
                           value={user.middleName}
                           type={'text'}/>
                </label>
                <label>
                    Статус
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfileAction({...user, status: e.target.value}))}
                           value={user.status}
                           type={'text'}/>
                </label>
                <label>
                    Обо мне
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfileAction({...user, about: e.target.value}))}
                           value={user.about}
                           type={'text'}/>
                </label>
                <label>
                    День рождения
                    <Input bg={'bg-stone-600'}
                           onChange={e => dispatch(updateProfileAction({...user, birthday: e.target.value}))}
                           value={user.birthday}
                           type={'date'}/>
                </label>
                <label>
                    Изображение профиля <span className={'text-sm italic text-stone-400'}>Изображение должно быть квадратным</span>
                    <Input onChange={e=>dispatch(updateProfileAction({...user, avatar: e.target.value}))} bg={'bg-stone-600'} value={user.avatar} type={'text'}/>
                </label>
                <SubmitButton onClick={updateProfile}>Обновить данные </SubmitButton>
            </div>
        </FgCard>
    );
};

export default ProfileTab;
