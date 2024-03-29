import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {IoSettingsSharp} from "react-icons/io5";
import moment from "moment/moment";
import {IUser} from "../../../types/User";

interface UserOverviewProps {
    user: IUser
    userId: string
    authedUserId: number
}

const UserOverview: FC<UserOverviewProps> = ({user, userId, authedUserId}) => {

    return (
        <div className={"block--light"}>
            <div className={"flex sm:flex-row xs:flex-col gap-4 w-full"}>
                <div className={"flex xs:items-center flex-col gap-2 sm:items-end"}>
                    <img className={"rounded-lg"}
                         width={"200px"}
                         height={"200px"}
                         src={user.avatar}
                         alt="user profile picture"/>
                    {authedUserId === +userId &&
                        <Link to={"edit"}
                              className={"hover:text-stone-400 transition-colors flex gap-2 text-2xl items-center"}>
                            <span className={"text-lg"}>Настройки</span>
                            <IoSettingsSharp/>
                        </Link>
                    }
                </div>
                <div className={"flex flex-col gap-8 flex-1"}>
                    <div>
                        <div>
                            {user.name} {user.lastName} {user.middleName}
                        </div>
                        <div>
                            {user.birthday &&
                                (moment(user.birthday).format("YYYY")) + " года / "}
                            {user.status && user.status + " / "} Здесь
                            с {moment(user.created_at).format("YYYY")} года
                        </div>
                    </div>
                    <div className={"flex flex-col flex-1"}>
                        <h2 className={"font-bold mb-2 italic text-end mr-2"}>Информация обо мне</h2>
                        <div className={"block--dark flex-1"}>
                            {user.about}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOverview;
