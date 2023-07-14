import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {HiEye, HiEyeOff} from "react-icons/hi";

interface EpisodesProps {
    videos: any
    episode: number
    animeID: number
    setEpisode: Dispatch<SetStateAction<number>>

}

const Episodes: FC<EpisodesProps> = ({videos, setEpisode, episode, animeID}) => {
    const [epWatched, setEpWatched] = useState([]);

    const watchHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, episode: number) => {
        e.stopPropagation()
        // [{animeID: 1, episodes: [1,2,3]}, ...]
        const epWatched = localStorage.getItem(`EpisodesWatched${animeID}`)
        let parsed = JSON.parse(epWatched) ?? [] // [1,2,3] ?? null

        if (parsed.includes(episode)) {
            parsed = parsed.filter(num => num !== episode)
            if (!parsed.length) {
                localStorage.removeItem(`EpisodesWatched${animeID}`)
            }
        } else {
            parsed.push(episode)
        }
        localStorage.setItem(`EpisodesWatched${animeID}`, JSON.stringify(parsed))
        setEpWatched(parsed)
    }
    useEffect(() => {
        const episodesWatched = JSON.parse(localStorage.getItem(`EpisodesWatched${animeID}`)) ?? []
        setEpWatched(episodesWatched)
    }, []);
    return (
        <div className={"md:gap-4 xs:gap-2 gap-2 flex overflow-x-scroll"}>
            {videos?.map((link) =>
                <div key={link.id} onClick={() => setEpisode(link.episode)}
                     className={`${episode === link.episode ? "bg-red-700 cursor-default" : "bg-neutral-800 hover:bg-red-700 cursor-pointer"} items-center gap-1 flex whitespace-nowrap md:p-4 xs:p-2 rounded-lg `}>
                    <span>Серия {link.episode}</span>
                    <div onClick={e => watchHandler(e, link.episode)}>
                        {
                            !epWatched?.includes(link.episode) ?
                                <HiEyeOff color={'a6a6a6'}/>
                                :
                                <HiEye/>

                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default Episodes;
