import React, {FC, useState} from 'react';
import Input from "../UI/input";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface userProps {
    name: string;
    password: string;
    passwordConfirm: string;
    email: string;
}

const RegistrationPage: FC = () => {
    const [user, setUser] = useState<userProps>({name: '', password: '', passwordConfirm: '', email: ''})
    const [errors, setErrors] = useState<boolean>(false)
    const navigate = useNavigate()

    const registrationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post<userProps>('/registration',
            {
                name: user.name,
                password: user.password,
                password_confirmation: user.passwordConfirm,
                email: user.email
            }).then(() => {
                navigate('/');
        }).catch(err => {
            setErrors(err.response.data.errors)
            // for (const err in errorsArr) {
            //     let errname
            //     setErrors({errname: })
            // console.log(err)
            // }
        })
    }
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <div className={'flex flex-col gap-4 bg-stone-600 p-4 rounded-lg'}>
                <h3 className={'text-center text-2xl'}>Регистрация</h3>
                {errors ? <h4 className={'text-center text-rose-400 text-lg'}>Проверьте данные. с ними все впорядке?</h4> : ''}

                <div>
                    <label>Имя</label>
                    {/*{errors.name ? <span>Минимальная длинна 2 символа</span> : ''}*/}
                    <Input onChange={e => setUser({...user, name: e.target.value})}
                           type={'text'}
                           bg={'bg-stone-700'}
                           placeholder={'Элеонор'}/>
                </div>
                <div>
                    <label>Email</label>
                    {/*{errors.name ? <span>Проверьте правильность Email</span> : ''}*/}
                    <Input onChange={e => setUser({...user, email: e.target.value})}
                           type={'email'}
                           bg={'bg-stone-700'}
                           placeholder={'yamero0923@nesa.xyz'}/>
                </div>
                <div>
                    <label>Пароль</label>
                    {/*{errors.name ? <span>Минимальная длинна 8 символов</span> : ''}*/}
                    <Input onChange={e => setUser({...user, password: e.target.value})}
                           type={'password'}
                           bg={'bg-stone-700'}
                           placeholder={'QWERTY00'}/>
                </div>
                <div>
                    <label>Подтверждение пароля</label>
                    {/*{errors.name ? <span>Пароль должен совпадать</span> : ''}*/}
                    <Input onChange={e => setUser({...user, passwordConfirm: e.target.value})}
                           type={'password'}
                           bg={'bg-stone-700'}
                           placeholder={'QWERTY00'}/>
                </div>
                <div>
                    <button className={'w-full bg-stone-500 p-2 rounded-lg'}
                            onClick={e => registrationHandler(e)}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
