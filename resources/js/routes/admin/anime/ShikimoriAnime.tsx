import React, {FC, useEffect, useState} from 'react';
import {csrf_token} from "../../../mockData";

const ShikimoriAnime: FC = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(1);
    const [timerID, setTimerID] = useState(null);
    const saveAnimeToDB = (anime) => {
        fetch('/api/anime/newByShiki', {
            headers: {
                'X-CSRF-TOKEN': csrf_token,
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(anime),
        })
    }
    const fetchAnime = (id: number) => {
        let err = false
        setId(prev => prev + 1)
        fetch('https://shikimori.me/api/animes/' + id)
            .then(r => r.json())
            .then(r => {
                if (r.id) {
                    setData(prev => [...prev, r])
                    saveAnimeToDB(r)
                }
            })
            .catch(e => console.error(e.code))
        return
    }
    useEffect(() => {
        const lastId = JSON.parse(localStorage.getItem('usedId')) ?? 1
        setId(lastId)
    }, []);
    const intervalFetch = () => {
        let ID = id
        if (timerID) {
            setTimerID(null)
            clearInterval(timerID)
            setId(ID)
            localStorage.setItem('usedId', String(ID))
            return
        }
        const timerId = setInterval(() => {
            fetchAnime(ID)
            ID += 1
            setId(ID)
            localStorage.setItem('usedId', String(ID))
        }, 700)
        setTimerID(timerId)
    };
    useEffect(() => {
        return () => {
            clearInterval(timerID)
        }
    }, []);
    return (
        <div>
            <input type="text" value={id}
                   onChange={(e) => setId(+e.target.value)}/>
            <button onClick={() => setData([])}>clear data</button>
            <button onClick={() => fetchAnime(id)}>Fetch {id}</button>
            <button onClick={intervalFetch}>set intervalFetch</button>
            {/*<button onClick={() => setId(1)}>setId 1</button>*/}
            <div className={'grid grid-cols-4'}>
                {data.map(anime =>
                    <div key={anime.id} onClick={() => saveAnimeToDB(anime)}>
                        <img src={`https://shikimori.me/${anime?.image?.preview}`} alt=""/>
                        <span className={'whitespace-pre-wrap'}>{anime.russian}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShikimoriAnime;
