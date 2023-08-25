import React from "react";
import {useParams} from "react-router";
import {useGetUserQuery} from "services/userService";
import Loader from "../components/Loader";
import UserOverview from "../components/profilePage/profile/UserOverview";
import UserAnimeOverview from "../components/profilePage/profile/UserAnimeOverview";

const ProfilePage = () => {
    const {username: userId} = useParams();
    const {data: authedUser} = useGetUserQuery()

    const {user} = useGetUserQuery(userId, {
        selectFromResult: ({data}) => ({
            user: authedUser?.id === +userId ? authedUser : data,
        }),
    })

    if (!user) return <Loader/>;

    return (
        <div className={"p-4 flex flex-col gap-4"}>
            <UserOverview user={user} userId={userId} authedUserId={authedUser.id}/>
            <UserAnimeOverview userId={userId}/>
        </div>
    );
};

export default ProfilePage;
