import React, {FC, useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import {useSetScoreToAnimeMutation} from "services/Collections/AnimeService";

interface CollectionScoresProps {
    score: number | null
    collectionId: number
    userScore: number
}

const CollectionScore: FC<CollectionScoresProps> = ({collectionId, score, userScore}) => {
    const [selectedScore, setSelectedScore] = useState(userScore);
    const [setScore] = useSetScoreToAnimeMutation()

    const scores = [1, 2, 3, 4, 5]

    const setScoreHandle = (score: number) => {
        setScore({id: collectionId, score})
    }

    useEffect(() => {
        setSelectedScore(userScore)
    }, [score]);


    return (
        <div className={'flex justify-between'}>
            {scores.map(num =>
                <FaStar key={num} size={'1.5rem'}
                        className={`select-none ${num <= selectedScore ? 'fill-amber-400' : 'fill-neutral-300'}`}
                        onMouseEnter={() => setSelectedScore(num)}
                        onMouseLeave={() => setSelectedScore(userScore)}
                    // onTouchStart={() => setSelectedScore(num)}
                    // onTouchEnd={() => setSelectedScore(userScore)}
                        onClick={() => setScoreHandle(num)}/>
            )}
            <span>{score}</span>
        </div>
    );
};

export default CollectionScore;
