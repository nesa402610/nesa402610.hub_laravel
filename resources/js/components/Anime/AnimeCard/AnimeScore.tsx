import React, {FC, useEffect, useState} from 'react';
import {FaStar} from 'react-icons/fa';
import {AnimeAPI, useSetScoreToAnimeMutation} from "services/Anime/AnimeService";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useSearchParams} from "react-router-dom";
import {useGetUserQuery} from "services/userService";

interface CollectionScoresProps {
    animeId: number
    score: number
}

enum ScoresName {
    'ужасно' = 1,
    'плохо',
    'сердне',
    'хорошо',
    'отлично'
}

const AnimeScore: FC<CollectionScoresProps> = ({animeId, score}) => {
    const [selectedScore, setSelectedScore] = useState(score);
    const [setScore] = useSetScoreToAnimeMutation()

    const scores = [1, 2, 3, 4, 5]

    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.collection)
    const [params] = useSearchParams();
    const {data: user} = useGetUserQuery();

    const setScoreHandle = (score: number) => {
        setScore({id: animeId, score})
            .unwrap()
            .then((r) => {
                dispatch(
                    AnimeAPI.util.updateQueryData('getAllAnime', {
                        page: +params.get('page') || 1,
                        query: filter,
                    }, (draft) => {
                        const anim = draft.data.find(a => a.id === animeId);
                        if (anim) {
                            Object.assign(anim, r)
                        }
                    }),
                )
                dispatch(
                    AnimeAPI.util.updateQueryData('getUserAnimeList', {
                        userId: String(user.id), animestatus: window.location.pathname.split('/')[4]
                    }, (draft) => {
                        const anime = draft.find((anime) => anime.id === anime.id);
                        if (anime) {
                            Object.assign(anime, r)

                        }
                    }),
                )
            })
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
            <div className={'flex flex-col items-center self-end w-12'}>
                <span className={'font-bold text-xl'}>{score}</span>
                <span className={'text-[12px]'}>{ScoresName[score]}</span>
            </div>
        </div>
    );
};

export default AnimeScore;
