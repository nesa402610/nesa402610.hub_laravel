import React, {FC, useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import {useSetScoreToAnimeMutation} from "services/Collections/AnimeService";

interface CollectionScoresProps {
    collectionId: number
    score: number
}

enum Scores {
    'ужасно' = 1,
    'плохо',
    'сердне',
    'хорошо',
    'отлично'
}

const CollectionScore: FC<CollectionScoresProps> = ({collectionId, score}) => {
    const [selectedScore, setSelectedScore] = useState(score);
    const [setScore] = useSetScoreToAnimeMutation()

    const scores = [1, 2, 3, 4, 5]

    const setScoreHandle = (score: number) => {
        setScore({id: collectionId, score})
    }

    useEffect(() => {
        setSelectedScore(score)
    }, [score]);


    return (
        <div className={'flex justify-between items-center'}>
            {scores.map(num =>
                <FaStar key={num} size={'1.5rem'}
                        className={`select-none ${num <= selectedScore ? 'fill-amber-400' : 'fill-neutral-300'}`}
                        onMouseEnter={() => setSelectedScore(num)}
                        onMouseLeave={() => setSelectedScore(score)}
                    // onTouchStart={() => setSelectedScore(num)}
                    // onTouchEnd={() => setSelectedScore(userScore)}
                        onClick={() => setScoreHandle(num)}/>
            )}
            <div className={'flex flex-col items-center self-end'}>
                <span className={'font-bold text-xl'}>{score}</span>
                <span className={'text-[12px]'}>{Scores[score]}</span>
            </div>
        </div>
    );
};

export default CollectionScore;
