import React from 'react';
import {Link} from "react-router-dom";

const Message = ({message: msg}) => {
    return (
        <div key={msg.id} className={'flex sm:flex-row mb-2 sm:items-center flex-col xs:items-start'}>
            {/*<div className={'w-[40px]'}>*/}
            {/*    {msg.id}*/}
            {/*</div>*/}
            <Link to={`/profile/${msg.user.id}`} className={'flex items-center'}>
                <div className={'w-[40px] mr-2 rounded-full overflow-hidden'}>
                    <img src={msg.user.avatar} alt=""/>
                </div>
                <div>
                    {msg.user.name}: &nbsp;
                </div>
            </Link>
            <div>
                {msg.message}
            </div>
        </div>
    );
};

export default Message;
