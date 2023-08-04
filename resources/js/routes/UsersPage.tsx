import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useGetAllUsersQuery} from "../services/userService";
import Loader from "../components/Loader";
import Error from '../components/Error'

const UsersPage: FC = () => {
    const {data: users, isLoading, isError} = useGetAllUsersQuery()

    if (isLoading) return <Loader/>
    if (isError) return <Error/>
    return (
        <div className={"m-4"}>
            <div className={"flex flex-wrap gap-4"}>
                {users.map(u =>
                    <Link to={`/profile/${u.id}`} className={"block--dark flex-1"}>
                        <div className={'h-[75px] flex rounded-lg overflow-hidden'}>
                            <img src={u.avatar} alt="аватар"/>
                        </div>
                        <div>
                            {u.name} {u.lastName}
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
