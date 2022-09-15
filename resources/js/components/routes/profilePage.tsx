import React, {FC} from 'react';
import BgCard from "../bgCard";
import FgCard from "../fgCard";
import Input from "../UI/input";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../types/types";

const ProfilePage: FC = () => {
    const user: IUser = useTypedSelector(state => state.auth.user)
    return (
        <div className={'p-4'}>
            <h1 className={'text-center text-2xl mb-4 font-bold'}>Профиль</h1>
            <BgCard>
                <FgCard>
                    <h2 className={'text-center text-lg'}>Аккаунт</h2>
                    <div className={'flex flex-col gap-4'}>
                        <label htmlFor="">
                            Email
                            <Input bg={'bg-stone-600'} value={user.email} type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Телефон
                            <Input bg={'bg-stone-600'} value={user.phone} type={'text'}/>
                        </label>
                    </div>
                </FgCard>
                <FgCard>
                    <h2 className={'text-center text-lg'}>Профиль</h2>
                    <div className={'flex flex-col gap-4'}>
                        <label htmlFor="">
                            Имя
                            <Input bg={'bg-stone-600'} value={user.name} type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Фамилия
                            <Input bg={'bg-stone-600'} value={user.lastName} type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Отчество
                            <Input bg={'bg-stone-600'} value={user.middleName} type={'text'}/>
                        </label>
                        <label htmlFor="">
                            День рождения
                            <Input bg={'bg-stone-600'} value={user.middleName} type={'text'}/>
                        </label>
                        <label htmlFor="">
                            Изображение профиля
                            <Input bg={'bg-stone-600'} type={'file'}/>
                        </label>
                    </div>
                </FgCard>
            </BgCard>
        </div>
    );
};

export default ProfilePage;
