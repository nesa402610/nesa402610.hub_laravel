import React, {useState} from 'react';
import SecurityTabPassword from "./securityTab__password";
import SecurityTabEmail from "./securityTab__email";

const SecurityTab = () => {
    const [passwords, setPasswords] = useState(
        {current: '', newPass: ''}
    )
    const [emails, setEmails] = useState({
        current: '', newEmail: '',
    })
    return (
        <>
            <SecurityTabPassword passwords={passwords} setPasswords={setPasswords}/>
            <SecurityTabEmail emails={{setEmails, emails}} passwords={{passwords, setPasswords}}/>
        </>
    );
};

export default SecurityTab;
