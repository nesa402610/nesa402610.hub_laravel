import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useGetAllUsersQuery} from "services/userService";
import Loader from "../components/Loader";
import Error from '../components/Error'

const UsersPage: FC = () => {
    const {data: users, isLoading, isError} = useGetAllUsersQuery()

    if (isLoading) return <Loader/>
    if (isError) return <Error/>
    return (
        <div className={"m-4"}>
            <div className={"grid grid-cols-3 gap-4"}>
                {users.map(u =>
                    <Link to={`/profile/${u.id}`} className={`block--dark flex flex-row gap-4 justify-between`}>
                        <div className={'flex flex-col gap-2'}>
                            <span>{u.name} {u.lastName}</span>
                            <span className={'text-justify'}>{u.about}</span>
                        </div>
                        <div><img className={'min-w-[150px] w-[150px]'} src={u.avatar ?? ''}/></div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
