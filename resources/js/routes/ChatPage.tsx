import React, {FC, useState} from 'react';
import {Link} from "react-router-dom";
import {useGetUserQuery} from "services/userService";
import {useGetMessagesQuery, useSendMessageMutation} from "services/chatService";
import Loader from "../components/Loader";
import Message from "components/Chat/Message";

const ChatPage: FC = () => {
    const {data: user} = useGetUserQuery()
    const {
        data: messages,
        isLoading,
    } = useGetMessagesQuery(null, {pollingInterval: 15000})
    const [sendMessage, {}] = useSendMessageMutation()
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(false);

    const sendMessageHandler = (e: React.KeyboardEvent) => {
        if (message.length > 0 && e.key === 'Enter' && !timer) {
            setTimer(true)
            setMessage('')
            sendMessage(message)
            setTimeout(() => {
                setTimer(false)
            }, 2000)
        }
    }

    return (
        <div className={'ml-4 block--dark flex gap-4 justify-between h-screen flex-col'}>
            <div className={'h-full overflow-auto'}>
                {!isLoading ? messages.map(msg =>
                    <Message message={msg}/>
                ) : <Loader/>}
            </div>
            {user ? <input type="text"
                           onKeyUp={sendMessageHandler}
                           onChange={e => setMessage(e.target.value)}
                           placeholder={!timer ? 'Сообщение...' : 'Таймаут...'}
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
