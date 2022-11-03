import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import BgCard from "../components/bgCard";
import FgCard from "../components/fgCard";
import Input from "../components/UI/input";
import {IUser} from "../types/types";
import {useAppSelector} from "../hooks/redux";
import {Link} from "react-router-dom";

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
    const [messages, setMessages] = useState([]);
    const [timer, setTimer] = useState(false);
    const {isAuth} = useAppSelector(state => state.auth)

    useEffect(() => {
        fetchChat()
        const timer = setInterval(() => {
            fetchChat()
        }, 5000)
        return () => {
            window.clearInterval(timer)
        }
    }, []);

    const fetchChat = () => {
        axios.get<IChat[]>('/chat')
            .then(r => setMessages(r.data))
    }
    const sendMessage = (e) => {
        if (message.length > 0 && e.key === 'Enter' && !timer) {
            setTimer(true)
            setMessage('')
            axios.post('/chatSend', {message})
                .then(r => {
                    setMessages([...messages, r.data])
                })
            setTimeout(() => {
                setTimer(false)
            }, 2000)
        }
    }
    return (
        <BgCard className={'justify-between h-[90vh] sm:flex-col'}>
            <FgCard className={'overflow-auto'}>
                {messages.map(msg =>
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
            </FgCard>
            {isAuth ? <Input type="text"
                             bg={'bg-stone-500'}
                             onKeyPress={e => sendMessage(e)}
                             onChange={e => setMessage(e.target.value)}
                             placeholder={'Сообщение...'}
                             value={message}
                /> :
                <h2 className={'text-center font-bold'}>Для общения в чате требуется <Link to={'/login'}
                                                                                           className={'text-blue-500 hover:text-blue-300'}>авторизация</Link>
                </h2>
            }
        </BgCard>
    );
};

export default ChatPage;
