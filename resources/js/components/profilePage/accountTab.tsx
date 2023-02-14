import React, {FC, useState} from 'react';
import {IUser} from "../../types/types";
import {useUpdateAccountMutation} from "../../services/userService";


interface accountTabProps {
    user: IUser
}

const AccountTab: FC<accountTabProps> = ({user}) => {
    const [userData, setUserData] = useState<IUser>(user);
    const [updateAccount, {}] = useUpdateAccountMutation()
    return (
        <div className={'block--light sm:flex-col'}>
            <h2 className={'text-center text-xl'}>Аккаунт</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Email
                    <input className={'bg-stone-700'}
                           onChange={e => setUserData({...userData, email: e.target.value})}
                           value={user.email}
                           type={'text'}/>
                </label>
                <label htmlFor="">
                    Телефон
                    <input className={'bg-stone-700'}
                           onChange={e => setUserData({...userData, phone: e.target.value})}
                           value={user.phone}
                           type={'text'}/>
                </label>
                <button className={'bg-stone-700'} onClick={() => updateAccount(userData)}>Обновить данные</button>
            </div>
        </div>
    );
};

export default AccountTab;
