import React, {FC, useState} from "react";
import {Link} from "react-router-dom";
import {useGetAllUsersQuery} from "services/userService";
import Loader from "../components/Loader";
import Error from '../components/Error'
import useDebounce from "hooks/useDebounce";

const UsersPage: FC = () => {
    const [searchValue, setSearchValue] = useState('')
    const search = useDebounce(searchValue)
    const {data: users, isLoading, isError} = useGetAllUsersQuery(search)

    if (isLoading) return <Loader/>
    if (isError) return <Error/>
    return (
        <div className={'m-4'}>
            <div className={'mb-4'}>
                <input type="text" value={searchValue} onChange={e => setSearchValue(e.target.value)}
                       placeholder={'Имя...'}/>
            </div>
            <div className={"grid lg:grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 gap-4"}>
                {users.map(u =>
                    <Link to={`/profile/${u.id}`}
                          className={`transition-all group hover:bg-neutral-700 block--dark flex flex-col gap-4 justify-between`}>
                        <div className={'flex flex-col gap-2'}>
                            <span className={'font-bold'}>{u.name} {u.lastName}</span>
                        </div>
                        <div className={'flex gap-4 xs:flex-col md:flex-row'}>
                            {u.about &&
                                <div className={'text-justify group-hover:bg-neutral-800 block--light'}>{u.about}</div>}
                            <img className={'h-[125px] w-[125px] rounded-full'} alt={''} src={u.avatar || ''}/>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
