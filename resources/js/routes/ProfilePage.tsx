import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {IoSettingsSharp} from "react-icons/io5";
import {IUser} from "../types/types";
import moment from "moment";
import {useParams} from "react-router";
import axios from "axios";
import {useGetUserQuery} from "../services/userService";
import {HiBadgeCheck} from "react-icons/hi";

const ProfilePage = () => {
  const {data: authedUser} = useGetUserQuery('')
  const [user, setUser] = useState<IUser>(null)
  const userName = useParams()

  useEffect(() => {
    // @ts-ignore
    if (authedUser?.id == userName.username || !userName) {
      return setUser(authedUser)
    } else {
      axios.get('/profile/' + userName.username)
        .then(r => {
          setUser(r.data)
        })
    }

  }, [userName])


  if (user) return (
    <div className={'p-4 h-screen'} style={{backgroundImage: `linear-gradient(rgb(64 64 64 / 0%), rgb(64, 64, 64)), url(${user.background_profile_image})`,}}>

      <div className={'block--light overflow-hidden'}>
        <div className={'h-[200px] -m-4'}
             style={{background: `linear-gradient(rgb(64 64 64 / 0%) -60%, rgb(64, 64, 64) 95%), url(${user.banner_image}) center`}}>
        </div>
        <div className={'flex sm:flex-row xs:flex-col gap-4 w-full'}>
          <div className={'flex xs:items-center flex-col gap-2 sm:items-end'}>
            <img className={'rounded-lg'}
                 width={'200px'}
                 height={'200px'}
                 src={user.avatar}
                 alt="user profile picture"/>
            <Link to={'edit'}
                  className={'hover:text-stone-400 transition-colors flex gap-2 text-2xl items-center'}>
              <span className={'text-lg'}>Настройки</span>
              <IoSettingsSharp/>
            </Link>
          </div>
          <div className={'flex flex-col gap-8 flex-1'}>
            <div>
              <div className={'flex items-center gap-1'}>
                <span>{user.name} {user.lastName} {user.middleName}</span>
                {user.verified ? <span><HiBadgeCheck className={'text-blue-300 text-lg'}/></span> : ''}
              </div>
              <div>
                {user.birthday &&
                  (moment(user.birthday).format('YYYY')) + ' года / '}
                {user.status && user.status + ' / '} Здесь
                                                     с {moment(user.created_at).format('YYYY')} года
              </div>
            </div>
            <div className={'flex flex-col flex-1'}>
              <h2 className={'font-bold mb-2 italic text-end mr-2'}>Информация обо мне</h2>
              <div className={'block--dark flex-1'}>
                {user.about}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
