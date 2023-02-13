import React, {FC, useState} from 'react';
import {IUser} from "../types/types";
import {Link} from "react-router-dom";
import {useGetUserQuery} from "../services/userService";
import {useGetMessagesQuery, useSendMessageMutation} from "../services/chatService";

interface IMessage {
    id: number
    user_id: number
    user: IUser
    message: string
}

interface IChat {
    message: IMessage
}

const ChatPage: FC = () => {
    const [message, setMessage] = useState('');
    const {data: messages} = useGetMessagesQuery('',
        {pollingInterval: 15000}
    )
    const [sendMessage, {}] = useSendMessageMutation()
    const [timer, setTimer] = useState(false);
    const {data: isAuth} = useGetUserQuery('')

    const sendMessageHandler = (e) => {
        if (message.length > 0 && e.key === 'Enter' && !timer) {
            setTimer(true)
            setMessage('')
            sendMessage({message})
            setTimeout(() => {
                setTimer(false)
            }, 2000)
        }
    }
    return (
        <div className={'block--light flex gap-4 justify-between h-[90vh] sm:flex-col'}>
            <div className={'block--dark h-full overflow-auto'}>
                {messages?.map(msg =>
                    <div key={msg.id} className={'flex sm:flex-row mb-2 sm:items-center xs:flex-col xs:items-start'}>
                        {/*<div className={'w-[40px]'}>*/}
                        {/*    {msg.id}*/}
                        {/*</div>*/}
                        <div className={'flex items-center'}>
                            <div className={'w-[40px] mr-2 rounded-full overflow-hidden'}>
                                <img src={msg.user.avatar} alt=""/>
                            </div>
                            <div>
                                {msg.user.name}: &nbsp;
                            </div>
                        </div>
                        <div>
                            {msg.message}
                        </div>
                    </div>
                )}
            </div>
            {isAuth ? <input type="text"
                             className={'bg-stone-500'}
                             onKeyPress={e => sendMessageHandler(e)}
                             onChange={e => setMessage(e.target.value)}
                             placeholder={'Сообщение...'}
                             value={message}
                             disabled={timer}
                /> :
                <h2 className={'text-center font-bold'}>
                    <span>Для общения в чате требуется &nbsp;</span>
                    <Link to={'/login'} className={'text-blue-500 hover:text-blue-300'}>авторизация</Link>
                </h2>
            }
        </div>
    );
};

export default ChatPage;
