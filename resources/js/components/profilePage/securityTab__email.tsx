import React from 'react';
import Input from "../UI/input";
import FgCard from "../fgCard";

const SecurityTabEmail = ({emails, passwords}) => {
    return (
        <FgCard className={'flex flex-col gap-2'}>
            <h2 className={'text-2xl text-center'}>Смена почты</h2>
            <div>
                <label htmlFor="">Текущий пароль</label>
                <Input type={'password'}
                       required={true}
                       value={passwords.passwords.current}
                       onChange={e => passwords.setPasswords({...passwords, current: e.target.value})}
                       placeholder={'Текущий пароль'}/>
            </div>
            <div>
                <label htmlFor="">Текущий Email</label>
                <Input type={'email'}
                       required={true}
                       value={emails.emails.current}
                       onChange={e => emails.setEmails({...emails.emails, current: e.target.value})}
                       placeholder={'Новый пароль'}/>
            </div>
            <div>
                <label htmlFor="">Новый Email</label>
                <Input type={'email'}
                       required={true}
                       value={emails.emails.newEmail}
                       onChange={e => emails.setEmails({...emails.emails, newEmail: e.target.value})}
                       placeholder={'Новый пароль'}/>
            </div>
        </FgCard>
    );
};

export default SecurityTabEmail;
