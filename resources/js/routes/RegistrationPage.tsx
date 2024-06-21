import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useGetUserQuery} from "services/userService";

interface userProps {
    name: string;
    password: string;
    passwordConfirm: string;
    email: string;
}

const RegistrationPage: FC = () => {
    const {data: authedUser} = useGetUserQuery()
    const [user, setUser] = useState<userProps>({name: '', password: '', passwordConfirm: '', email: ''})
    const [errors, setErrors] = useState<boolean>(false)
    const navigate = useNavigate()

    const registrationHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post<userProps>('/api/registration',
            {
                name: user.name,
                password: user.password,
                password_confirmation: user.passwordConfirm,
                email: user.email
            }).then(() => {
            navigate('/');
        })
            .then(() => {
                navigate('/login')
            })
            .catch(err => {
                setErrors(err.response.data.errors)
                // for (const err in errorsArr) {
                //     let errname
                //     setErrors({errname: })
                // console.log(err)
                // }
            })
    }
    useEffect(() => {
        if (authedUser) {
            navigate(-1)
        }
    }, [authedUser]);
    return (
        <div className={'flex flex-col items-center justify-center h-screen xs:p-4 sx:p-0'}>
            <div className={'flex flex-col gap-4 bg-neutral-800 p-4 rounded-lg xs:w-full sm:w-auto'}>
                <h3 className={'text-center text-2xl'}>Регистрация</h3>
                {errors ? <h4 className={'text-center text-rose-400 text-lg'}>Проверьте данные. с ними все в
                    порядке?</h4> : ''}

                <div>
                    <label>Имя</label>
                    {/*{errors.name ? <span>Минимальная длинна 2 символа</span> : ''}*/}
                    <input onChange={e => setUser({...user, name: e.target.value})}
                           type={'text'}
                           className={'bg-neutral-700'}
                           placeholder={'Элеонор'}/>
                </div>
                <div>
                    <label>Email</label>
                    {/*{errors.name ? <span>Проверьте правильность Email</span> : ''}*/}
                    <input onChange={e => setUser({...user, email: e.target.value})}
                           type={'email'}
                           className={'bg-neutral-700'}
                           placeholder={'yamero0923@nesa.xyz'}/>
                </div>
                <div>
                    <label>Пароль</label>
                    {/*{errors.name ? <span>Минимальная длинна 8 символов</span> : ''}*/}
                    <input onChange={e => setUser({...user, password: e.target.value})}
                           type={'password'}
                           className={'bg-neutral-700'}
                           placeholder={'QWERTY00'}/>
                </div>
                <div>
                    <label>Подтверждение пароля</label>
                    {/*{errors.name ? <span>Пароль должен совпадать</span> : ''}*/}
                    <input onChange={e => setUser({...user, passwordConfirm: e.target.value})}
                           type={'password'}
                           className={'bg-neutral-700'}
                           placeholder={'QWERTY00'}/>
                </div>
                <div className={'flex justify-end'}>
                    <Link to={'/login'} className={'text-sm italic text-end text-neutral-300'}>Уже есть аккаунт</Link>
                </div>
                <div>
                    <button className={'w-full bg-neutral-700 hover:bg-neutral-900 p-2 rounded-lg'}
                            onClick={e => registrationHandler(e)}>
                        Зарегистрироваться
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
