import React, {FC} from 'react';
import axios from "axios";
import {IUser} from "../../types/types";
import {login, updateAccount} from "../../store/reducers/authSlice";
import {useAppDispatch} from "../../hooks/redux";


interface accountTabProps {
    user: IUser
}

const AccountTab: FC<accountTabProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const updateAccountHandler = () => {
        axios.post('edit/updateAccount',
            {
                email: user.email,
                phone: user.phone
            })
            .then(r => {
                dispatch(login(r.data))
            })
            .catch(err =>
                console.log(err))
    }
    return (
        <div className={'block--light sm:flex-col'}>
            <h2 className={'text-center text-xl'}>Аккаунт</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Email
                    <input className={'bg-stone-700'}
                           onChange={e => dispatch(updateAccount({...user, email: e.target.value}))}
                           value={user.email}
                           type={'text'}/>
                </label>
                <label htmlFor="">
                    Телефон
                    <input onChange={e => dispatch(updateAccount({...user, phone: e.target.value}))}
                           className={'bg-stone-700'}
                           value={user.phone}
                           type={'text'}/>
                </label>
                <button className={'bg-stone-700'} onClick={updateAccountHandler}>Обновить данные </button>
            </div>
        </div>
    );
};

export default AccountTab;
