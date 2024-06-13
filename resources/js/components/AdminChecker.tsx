import React, {FC} from 'react';
import {useGetUserQuery} from "services/userService";

interface AdminCheckerProps {
    children: React.ReactNode
}

const AdminChecker: FC<AdminCheckerProps> = ({children}) => {
    const {data} = useGetUserQuery()
    if (data?.role[0]?.name === 'Admin')
        return (
            <>
                {children}
            </>
        );
};

export default AdminChecker;
