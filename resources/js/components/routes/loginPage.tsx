import React, {FC, useState} from 'react';
import Input from "../UI/input";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginAction} from "../../store/authReducer";

interface userProps {
    password: string
    email: string
}

interface loginProps {
    token: string
    r: any
    user: userProps
}

const RegistrationPage: FC = () => {
    const [user, setUser] = useState<userProps>({password: '', email: ''})
    const [errors, setErrors] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registrationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post('/login',
            {
                password: user.password,
                email: user.email
            })
            .then((r) => {
                console.log(r.data);
                dispatch(loginAction(r.data.user))
                localStorage.setItem('login', 'authed');
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors)//TODO
            })
    }
    return (
        <div className={'flex flex-col items-center justify-center'}>
            <div className={'flex flex-col gap-4 bg-stone-600 p-4 rounded-lg'}>
                <h3 className={'text-center text-2xl'}>Вход в аккаунт</h3>
                {errors ? <h4 className={'text-center text-rose-400 text-lg'}>Проверьте данные. с ними все
                                                                              впорядке?</h4> : ''}
                <div>
                    <label>Email</label>
                    {/*{errors.name ? <span>Проверьте правильность Email</span> : ''}*/}
                    <Input onChange={e => setUser({...user, email: e.target.value})}
                           type={'email'}
                           placeholder={'yamero0923@nesa.xyz'}/>
                </div>
                <div>
                    <label>Пароль</label>
                    {/*{errors.name ? <span>Минимальная длинна 8 символов</span> : ''}*/}
                    <Input onChange={e => setUser({...user, password: e.target.value})}
                           type={'password'}
                           placeholder={'QWERTY00'}/>
                </div>
                <div>
                    <button className={'w-full bg-stone-500 p-2 rounded-lg'}
                            onClick={e => registrationHandler(e)}>
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
