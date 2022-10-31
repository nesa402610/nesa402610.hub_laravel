import React, {FC, useEffect, useState} from 'react';
import axios from "axios";
import BgCard from "../components/bgCard";
import FgCard from "../components/fgCard";
import Input from "../components/UI/input";
import {IUser} from "../types/types";

interface IMessage {
    id: number
    user_id: number
    user: IUser
    message: string
}

interface IChat {
    message: IMessage
}

const ChatPage: FC<IChat> = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        setInterval(() => {
            fetchChat()
        }, 5000)
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
        <BgCard className={'justify-between min-h-[750px] sm:flex-col'}>
            <FgCard>
                {messages.map(msg =>
                    <div key={msg.id} className={'flex mb-2 items-center'}>
                        {/*<div className={'w-[40px]'}>*/}
                        {/*    {msg.id}*/}
                        {/*</div>*/}
                        <div className={'w-[40px] mr-2 rounded-full overflow-hidden'}>
                            <img src={msg.user.avatar} alt=""/>
                        </div>
                        <div>
                            {msg.user.name}: &nbsp;
                        </div>
                        <div>
                            {msg.message}
                        </div>
                    </div>
                )}
            </FgCard>
            <Input type="text"
                   bg={'bg-stone-500'}
                   onKeyPress={e => sendMessage(e)}
                   onChange={e => setMessage(e.target.value)}
                   placeholder={'Сообщение...'}
                   value={message}
            />
        </BgCard>
    );
};

export default ChatPage;
