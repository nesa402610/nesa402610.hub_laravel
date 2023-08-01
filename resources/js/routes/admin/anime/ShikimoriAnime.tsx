import React, {FC, useEffect, useState} from 'react';
import {csrf_token} from "../../../mockData";

const ShikimoriAnime: FC = () => {
    const [data, setData] = useState([]);
    const [id, setId] = useState(1);
    const saveAnimeToDB = (anime) => {
        fetch('/api/anime/newByShiki', {
            headers: {
                'X-CSRF-TOKEN': csrf_token,
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(anime),
        })
    }
    const fetchAnime = () => {
        fetch('https://shikimori.me/api/animes/' + id)
            .then(r => r.json())
            .then(r => {
                if (r.id) {
                    setData(prev => [...prev, r])
                    saveAnimeToDB(r)
                }
            })
            .catch(e => console.error(e))
        setId(prev => prev + 1)
        localStorage.setItem('usedId', JSON.stringify(id + 1))
    }
    useEffect(() => {
        const lastId = JSON.parse(localStorage.getItem('usedId')) ?? 1
        setId(lastId)
    }, []);
    return (
        <div>
            <input type="text" value={id}
                   onChange={(e) => setId(+e.target.value)}/>
            <button onClick={() => setData([])}>clear data</button>
            <button onClick={fetchAnime}>Fetch {id}</button>
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
