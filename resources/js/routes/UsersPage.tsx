import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {IUser} from "../types/User";

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get("/users")
      .then(r => setUsers(r.data));
  }, []);
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
