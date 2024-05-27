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

    const setScoreHandle = () => {
        setScore({id: collectionId, score: selectedScore})
    }

    useEffect(() => {
        setSelectedScore(userScore)
    }, [score]);


    return (
        <div className={'flex justify-between'}>
            {scores.map(num =>
                <FaStar key={num} size={'1.5rem'}
                        className={`${num <= selectedScore ? 'fill-amber-400' : 'fill-neutral-300'}`}
                        onMouseEnter={() => setSelectedScore(num)}
                        onMouseLeave={() => setSelectedScore(userScore)}
                        onClick={setScoreHandle}/>
            )}
            <span>{score}</span>
        </div>
    );
};

export default CollectionScore;
