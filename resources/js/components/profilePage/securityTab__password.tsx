import React, {useState} from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";
import SubmitButton from "../UI/submitButton";
import axios from "axios";


const SecurityTabPassword = () => {
    const [data, setData] = useState(
        {currentPassword: '', newPassword: ''}
    )
    const [errors, setErrors] = useState(null)

    const updatePassword = (e) => {
        e.preventDefault()
        setErrors(null)
        axios.post('/edit/updatePassword', data).then(r => {
            console.log(r.data)
        }).catch(err => {
            setErrors(err.response.data.error)
        })
    }
    return (
        <FgCard>
            <h2 className={'text-center text-2xl'}>Смена пароля</h2>
            {errors && <h3 className={'text-center text-xl text-red-400'}>{errors}</h3>}
            <div className={'flex flex-col gap-4'}>
                <label>
                    Текущий пароль
                    <Input type={'password'}
                           required={true}
                           value={data.currentPassword}
                           onChange={e => setData({...data, currentPassword: e.target.value})}
                           placeholder={'Текущий пароль'}/>
                </label>
                <label>
                    Новый пароль
                    <Input type={'password'}
                           required={true}
                           value={data.newPassword}
                           onChange={e => setData({...data, newPassword: e.target.value})}
                           placeholder={'Новый пароль'}/>
                </label>
                <SubmitButton onClick={updatePassword}>Обновить пароль</SubmitButton>
            </div>
        </FgCard>
    );
};

export default SecurityTabPassword;
