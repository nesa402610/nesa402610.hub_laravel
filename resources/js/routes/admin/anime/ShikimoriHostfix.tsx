import React, {useState} from 'react';
import {csrf_token} from "../../../mockData";

const ShikimoriHostfix = () => {
    const [currentHost, setCurrentHost] = useState('shikimori.??');
    const [newHost, setNewHost] = useState('shikimori.??');
    const [isUpdating, setIsUpdating] = useState(false);

    const updateHostHandle = (e) => {
        e.preventDefault()
        fetch('/api/anime/shikimori/hostfix',
            {
                body: JSON.stringify({currentHost, newHost}),
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': csrf_token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },

            },)
            .finally(() => setIsUpdating(false))
        setIsUpdating(true)
    }
    return (
        <div>
            {isUpdating && 'онбволение'}
            <h1>Обновление доменного имени Шикимори</h1>
            <form className={'flex gap-4'}>
                <div className={'flex-1 bg-slate-700 rounded-lg p-4'}>
                    <label className={'flex-1'}>
                        <span className={'text-sm italic text-neutral-400'}>Текущий домен</span>
                        <input onChange={e => setCurrentHost(e.target.value)}
                               className={'bg-slate-800'} type="text" value={currentHost}/>
                    </label>
                    <label className={'flex-1'}>
                        <span className={'text-sm italic text-neutral-400'}>Новый домен</span>
                        <input onChange={e => setNewHost(e.target.value)}
                               className={'bg-slate-800'} type="text" value={newHost}/>
                    </label>
                </div>
                <button className={'px-4 bg-slate-700 disabled:grayscale-[50%]'} onClick={updateHostHandle}
                        disabled={isUpdating}>Обновить
                </button>
            </form>
        </div>
    );
};

export default ShikimoriHostfix;
