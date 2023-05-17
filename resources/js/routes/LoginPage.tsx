import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../store/reducers/authSlice";
import {useAppDispatch} from "../hooks/redux";
import {useGetUserQuery} from "../services/userService";


interface userProps {
    password: string
    email: string
}

// interface loginProps {
//     token: string
//     r: any
//     user: userProps
// }

const LoginPage: FC = () => {
    const {data: authedUser} = useGetUserQuery()
    const [user, setUser] = useState<userProps>({password: '', email: ''})
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const registrationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            return setErrors({email: user.email, password: user.password});
        }
        axios.post('/login',
            {
                password: user.password,
                email: user.email
            })
            .then((r) => {
                dispatch(login(r.data.user))
                localStorage.setItem('login', 'authed');
                navigate('/');
            })
            .catch(err => {
                setErrors(err.response.data.errors)//TODO
            })
    }
    useEffect(() => {
        if (authedUser) {
            navigate(-1)
        }
    }, [authedUser]);
    return (
        <div className={'flex flex-col items-center justify-center h-screen xs:p-4 sm:p-0'}>
            <form className={'flex flex-col gap-4 bg-neutral-800 p-4 rounded-lg xs:w-full sm:w-auto'}>
                <h3 className={'text-center text-2xl'}>Вход в аккаунт</h3>
                {errors ? <h4 className={'text-center text-rose-400 text-lg'}>
                        Проверьте данные. с ними все в порядке?</h4>
                    : ''
                }
                <div>
                    <label>Email</label>
                    {errors?.email === '' ? <span>Проверьте правильность Email</span> : ''}
                    <input className={'bg-neutral-700'}
                           onChange={e => setUser({...user, email: e.target.value})}
                           type={'email'}
                           required={true}
                           placeholder={'yamero0923@nesa.xyz'}/>
                </div>
                <div>
                    <label>Пароль</label>
                    {errors?.password === '' ? <span>Поле должно быть заполнено</span> : ''}
                    <input className={'bg-neutral-700'}
                           onChange={e => setUser({...user, password: e.target.value})}
                           type={'password'}
                           required={true}
                           placeholder={'QWERTY00'}/>
                </div>
                <div className={'flex justify-between'}>
                    <Link to={''} className={'text-sm italic text-end text-neutral-300'}>Забыли пароль?</Link>
                    <Link to={'/registration'} className={'text-sm italic text-end text-neutral-300'}>Создать
                        аккаунт</Link>
                </div>

                <button className={'w-full bg-neutral-700 hover:bg-neutral-900 p-2 rounded-lg'}
                        onClick={e => registrationHandler(e)}>
                    Войти
                </button>

            </form>
        </div>
    );
};

export default LoginPage;
