import React, {useState} from 'react';
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
        <div className={'block--dark sm:flex-col'}>
            <h2 className={'text-center text-2xl'}>Смена пароля</h2>
            {errors && <h3 className={'text-center text-xl text-red-400'}>{errors}</h3>}
            <div className={'flex flex-col gap-4'}>
                <label>
                    Текущий пароль
                    <input type={'password'}
                           className={'bg-neutral-700'}
                           required={true}
                           value={data.currentPassword}
                           onChange={e => setData({...data, currentPassword: e.target.value})}
                           placeholder={'Текущий пароль'}/>
                </label>
                <label>
                    Новый пароль
                    <input type={'password'}
                           className={'bg-neutral-700'}
                           required={true}
                           value={data.newPassword}
                           onChange={e => setData({...data, newPassword: e.target.value})}
                           placeholder={'Новый пароль'}/>
                </label>
                <button className={'bg-neutral-700'} onClick={updatePassword}>Обновить пароль</button>
            </div>
        </div>
    );
};

export default SecurityTabPassword;
