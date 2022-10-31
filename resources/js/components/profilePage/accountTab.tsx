import React, {FC} from 'react';
import Input from "../UI/input";
import axios from "axios";
import {IUser} from "../../types/types";
import SubmitButton from "../UI/submitButton";
import {login, updateAccount} from "../../store/reducers/authSlice";
import {useAppDispatch} from "../../hooks/redux";
import BgCard from "../bgCard";


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
        <BgCard className={'sm:flex-col'}>
            <h2 className={'text-center text-xl'}>Аккаунт</h2>
            <div className={'flex flex-col gap-4'}>
                <label>
                    Email
                    <Input onChange={e => dispatch(updateAccount({...user, email: e.target.value}))}
                           bg={'bg-stone-700'}
                           value={user.email}
                           type={'text'}/>
                </label>
                <label htmlFor="">
                    Телефон
                    <Input onChange={e => dispatch(updateAccount({...user, phone: e.target.value}))}
                           bg={'bg-stone-700'}
                           value={user.phone}
                           type={'text'}/>
                </label>
                <SubmitButton className={'bg-stone-700'} onClick={updateAccountHandler}>Обновить данные </SubmitButton>
            </div>
        </BgCard>
    );
};

export default AccountTab;
