import React, {useEffect, useState} from 'react';
import axios from "axios";
import BgCard from "../components/bgCard";
import FgCard from "../components/fgCard";
import Input from "../components/UI/input";

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [timer, setTimer] = useState(false);

    useEffect(() => {
        axios.get('/chat')
            .then(r => setMessages(r.data))
    }, []);

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
        console.log(timer)

    }
    return (
        <BgCard className={'justify-between min-h-[750px] sm:flex-col'}>
            <FgCard>
                {messages.map(msg =>
                    <div>
                        {msg.id} {msg.user.name}: {msg.message}
                    </div>
                )}
            </FgCard>
            <Input type="text"
                   bg={'bg-stone-500'}
                   onKeyPress={e => sendMessage(e)}
                   onChange={e => setMessage(e.target.value)}
                   placeholder={'Сообщение...'}
                   value={message}/>
        </BgCard>
    );
};

export default ChatPage;
