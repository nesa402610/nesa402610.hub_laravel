import React from "react";
import {IUser} from "../../types/types";

const Users = () => {
  const data = []
  return (
    <div className={"flex flex-col gap-4"}>
      {data?.map((user: IUser) =>
        <div key={user.id} className={"flex bg-slate-600 p-2 rounded-lg"}>
          <span>{user.name}&nbsp;</span>
          <span>{user.lastName}</span>
        </div>
      )}
    </div>
  );
};

export default Users;
