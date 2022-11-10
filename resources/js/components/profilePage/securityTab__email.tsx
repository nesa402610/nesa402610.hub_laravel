import React, {useState} from 'react';
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
        <div className={'block--light sm:flex-col'}>
            <h2 className={'text-2xl text-center'}>Смена почты</h2>
            {errors && <h3 className={'text-center text-xl text-red-400'}>{errors}</h3>}
            <div className={'flex flex-col gap-4'}>
                <label>
                    Текущий пароль
                    <input type={'password'}
                           className={'bg-stone-700'}
                           required={true}
                           value={data.currentPassword}
                           onChange={e => setData({...data, currentPassword: e.target.value})}
                           placeholder={'Текущий пароль'}/>
                </label>
                <label>
                    Текущий Email
                    <input type={'email'}
                           className={'bg-stone-700'}
                           required={true}
                           value={data.currentEmail}
                           onChange={e => setData({...data, currentEmail: e.target.value})}
                           placeholder={'Текущий email'}/>
                </label>
                <label>
                    Новый Email
                    <input type={'email'}
                           className={'bg-stone-700'}
                           required={true}
                           value={data.newEmail}
                           onChange={e => setData({...data, newEmail: e.target.value})}
                           placeholder={'Новый email'}/>
                </label>
                <SubmitButton className={'bg-stone-700'} onClick={updateEmail}>
                    Обновить Email
                </SubmitButton>
            </div>
        </div>
    );
};

export default SecurityTabEmail;
