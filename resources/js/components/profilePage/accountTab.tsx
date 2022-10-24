import React, {FC} from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";
import axios from "axios";
import {IUser} from "../../types/types";
import SubmitButton from "../UI/submitButton";
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
        <FgCard>
            <h2 className={'text-center text-xl'}>Аккаунт</h2>
            <div className={'flex flex-col gap-4'}>
                <label htmlFor="">
                    Email
                    <Input onChange={e => dispatch(updateAccount({...user, email: e.target.value}))}
                           bg={'bg-stone-600'}
                           value={user.email}
                           type={'text'}/>
                </label>
                <label htmlFor="">
                    Телефон
                    <Input onChange={e => dispatch(updateAccount({...user, phone: e.target.value}))}
                           bg={'bg-stone-600'}
                           value={user.phone}
                           type={'text'}/>
                </label>
                <SubmitButton onClick={updateAccountHandler}>Обновить данные </SubmitButton>
            </div>
        </FgCard>
    );
};

export default AccountTab;
