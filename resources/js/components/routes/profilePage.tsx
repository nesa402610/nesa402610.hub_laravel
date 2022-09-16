import React, {FC} from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";
import Input from "../UI/input";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../types/types";
import {useDispatch} from "react-redux";
import axios from "axios";
import {updateAccountAction, updateProfileAction} from "../../store/authReducer";

const ProfilePage: FC = () => {
    //TODO
    const user: IUser = useTypedSelector(state => state.auth.user)
    console.log(user)
    const dispatch = useDispatch()
    const updateAccount = () => {
        axios.post('edit/updateAccount',
            {
                email: user.email,
                phone: user.phone
            })
            .then(r => {
                dispatch(updateAccountAction(r.data))
            })
            .catch(err =>
                console.log(err))
    }
    const updateProfile = () => {
        axios.post('edit/updateProfile',
            {
                name: user.name,
                middleName: user.middleName,
                lastName: user.lastName,
                birthday: user.birthday

            })
            .then(r => {
                dispatch(updateProfileAction(r.data))
            })
            .catch(err =>
                console.log(err))
    }

    return (
        <div className={'p-4'}>
            <h1 className={'text-center text-2xl mb-4 font-bold'}>Профиль</h1>
            <BgCard>
                <FgCard>
                    <h2 className={'text-center text-lg'}>Аккаунт</h2>
                    <div className={'flex flex-col gap-4'}>
                        <label htmlFor="">
                            Email
                            <Input onChange={e => dispatch(updateAccountAction({...user, email: e.target.value}))}
                                   bg={'bg-stone-600'}
                                   value={user.email}
                                   type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Телефон
                            <Input onChange={e => dispatch(updateAccountAction({...user, phone: e.target.value}))}
                                   bg={'bg-stone-600'}
                                   value={user.phone}
                                   type={'text'}/>
                        </label>
                        <button onClick={updateAccount} className={'bg-stone-600 p-2 rounded-lg'}>Обновить данные
                        </button>
                    </div>
                </FgCard>
                <FgCard>
                    <h2 className={'text-center text-lg'}>Профиль</h2>
                    <div className={'flex flex-col gap-4'}>
                        <label htmlFor="">
                            Имя
                            <Input bg={'bg-stone-600'}
                                   onChange={e => dispatch(updateProfileAction({...user, name: e.target.value}))}
                                   value={user.name}
                                   type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Фамилия
                            <Input bg={'bg-stone-600'}
                                   onChange={e => dispatch(updateProfileAction({...user, lastName: e.target.value}))}
                                   value={user.lastName}
                                   type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Отчество
                            <Input bg={'bg-stone-600'}
                                   onChange={e => dispatch(updateProfileAction({...user, middleName: e.target.value}))}
                                   value={user.middleName}
                                   type={'text'}/>
                        </label>
                        <label htmlFor="">
                            День рождения
                            <Input bg={'bg-stone-600'}
                                   onChange={e => dispatch(updateProfileAction({...user, birthday: e.target.value}))}
                                   value={user.birthday}
                                   type={'date'}/>
                        </label>
                        <label htmlFor="">
                            Изображение профиля
                            <Input bg={'bg-stone-600'} type={'file'}/>
                        </label>
                        <button onClick={updateProfile} className={'bg-stone-600 p-2 rounded-lg'}>Обновить данные
                        </button>
                    </div>
                </FgCard>
            </BgCard>
        </div>
    );
};

export default ProfilePage;
