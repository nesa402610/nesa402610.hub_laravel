import React, {FC} from 'react';
import {IAnimeVideos} from "../../../../../types/Anime";

interface episodesProps {
    videos: IAnimeVideos[]
    selectedEp: number

    setEpisode(number: number): any
}

const Episodes: FC<episodesProps> = ({videos, setEpisode, selectedEp}) => {
    return (
        <div className={"flex gap-4"}>
            {videos?.map((video, index) =>
                <div key={video.id}
                     className={`${index === selectedEp ? 'bg-slate-500' : 'bg-slate-700'} rounded-lg p-2`}
                     onClick={() => setEpisode(index)}>
                    Серия {video.episode}
                </div>
            )}
        </div>
    );
};

export default Episodes;
