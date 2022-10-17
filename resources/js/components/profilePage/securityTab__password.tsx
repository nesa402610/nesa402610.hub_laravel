import React from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";

const SecurityTabPassword = ({passwords,setPasswords}) => {
    return (
        <FgCard className={'flex flex-col gap-2'}>
            <h2 className={'text-center text-2xl'}>Смена пароля</h2>
            <div>
                <label htmlFor="">Текущий пароль</label>
                <Input type={'password'}
                       required={true}
                       value={passwords.current}
                       onChange={e => setPasswords({...passwords, current: e.target.value})}
                       placeholder={'Текущий пароль'}/>
            </div>
            <div>
                <label htmlFor="">Новый пароль</label>
                <Input type={'password'}
                       required={true}
                       value={passwords.newPass}
                       onChange={e => setPasswords({...passwords, newPass: e.target.value})}
                       placeholder={'Новый пароль'}/>
            </div>
        </FgCard>
    );
};

export default SecurityTabPassword;
