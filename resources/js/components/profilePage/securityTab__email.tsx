import React, {useState} from 'react';
import Input from "../UI/input";
import SubmitButton from "../UI/submitButton";
import axios from "axios";
import BgCard from "../bgCard";

interface dataProps {
    currentEmail: string
    newEmail: string
    currentPassword: string
}

const SecurityTabEmail = () => {
    const [data, setData] = useState<dataProps>(
        {
            currentEmail: '',
            newEmail: '',
            currentPassword: ''
        }
    )
    const [errors, setErrors] = useState(null)

    const updateEmail = (e) => {
        e.preventDefault()
        axios.post('/edit/updateEmail', data)
            .then(r => console.log(r.data))
            .catch(err => setErrors(err.response.data.error))
    }

    return (
        <BgCard className={'sm:flex-col'}>
            <h2 className={'text-2xl text-center'}>Смена почты</h2>
            {errors && <h3 className={'text-center text-xl text-red-400'}>{errors}</h3>}
            <div className={'flex flex-col gap-4'}>
                <label>
                    Текущий пароль
                    <Input type={'password'}
                           bg={'bg-stone-700'}
                           required={true}
                           value={data.currentPassword}
                           onChange={e => setData({...data, currentPassword: e.target.value})}
                           placeholder={'Текущий пароль'}/>
                </label>
                <label>
                    Текущий Email
                    <Input type={'email'}
                           bg={'bg-stone-700'}
                           required={true}
                           value={data.currentEmail}
                           onChange={e => setData({...data, currentEmail: e.target.value})}
                           placeholder={'Текущий email'}/>
                </label>
                <label>
                    Новый Email
                    <Input type={'email'}
                           bg={'bg-stone-700'}
                           required={true}
                           value={data.newEmail}
                           onChange={e => setData({...data, newEmail: e.target.value})}
                           placeholder={'Новый email'}/>
                </label>
                <SubmitButton className={'bg-stone-700'} onClick={updateEmail}>
                    Обновить Email
                </SubmitButton>
            </div>
        </BgCard>
    );
};

export default SecurityTabEmail;
