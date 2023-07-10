import React from "react";
import {Link} from "react-router-dom";
import {useGetAllUsersQuery} from "../services/userService";
import Loader from "../components/Loader";
import Error from '../components/Error'

const UsersPage = () => {
    const {data: users, isLoading, isError} = useGetAllUsersQuery()

    if (isLoading) return <Loader/>
    if (isError) return <Error/>
    return (
        <div className={"m-4"}>
            <div className={"flex flex-col gap-4"}>
                {users.map(u =>
                    <Link to={`/profile/${u.id}`} className={"block--dark"}>
                        {u.name}
                    </Link>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
