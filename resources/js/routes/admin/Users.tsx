import React from "react";
import {IUser} from "../../types/User";
import {useGetAllUsersQuery} from "../../services/userService";

const Users = () => {
  const {data} = useGetAllUsersQuery("");
  return (
    <div className={"flex flex-col gap-4"}>
      {data?.map((user: IUser) =>
        <div key={user.id} className={"flex gap-4 bg-slate-600 p-2 rounded-lg"}>
          <div>
            <img src={user.avatar} height={"100px"} width={"100px"} alt=""/>
          </div>
          <div>
            <span>{user.name}&nbsp;</span>
            <span>{user.lastName}</span>
            {user.email}
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
