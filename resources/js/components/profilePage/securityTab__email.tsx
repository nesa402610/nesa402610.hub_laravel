import React, {useState} from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";
import SubmitButton from "../UI/submitButton";
import axios from "axios";

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
        <FgCard>
            <h2 className={'text-2xl text-center'}>Смена почты</h2>
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
                    Текущий Email
                    <Input type={'email'}
                           required={true}
                           value={data.currentEmail}
                           onChange={e => setData({...data, currentEmail: e.target.value})}
                           placeholder={'Текущий email'}/>
                </label>
                <label>
                    Новый Email
                    <Input type={'email'}
                           required={true}
                           value={data.newEmail}
                           onChange={e => setData({...data, newEmail: e.target.value})}
                           placeholder={'Новый email'}/>
                </label>
                <SubmitButton onClick={updateEmail}>
                    Обновить Email
                </SubmitButton>
            </div>
        </FgCard>
    );
};

export default SecurityTabEmail;
