import React from 'react';
import SecurityTabPassword from "./securityTab__password";
import SecurityTabEmail from "./securityTab__email";

const SecurityTab = () => {
    return (
        <div className={'flex-col flex gap-4'}>
            <SecurityTabPassword/>
            <SecurityTabEmail/>
        </div>
    );
};

export default SecurityTab;
