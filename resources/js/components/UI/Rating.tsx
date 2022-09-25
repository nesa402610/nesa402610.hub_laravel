import React from 'react';
import {useDispatch} from "react-redux";
import {setRatingAction} from "../../store/homePageReducer";
import axios from "axios";
import {GiCheerful} from 'react-icons/gi';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IUser} from "../../types/types";
import {ratedAction} from "../../store/authReducer";

const Rating = ({project}) => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.auth.user) as IUser
    const setRatingHandle = (e, value) => {
        if (project.status !== 'Planned' &&
            user &&
            user.rates.filter(item => item.project_id === project.id).length <= 0
        ) {
            axios.post('/setRating', {
                project_id: project.id,
                rating: value
            }).then(r => {
                dispatch(setRatingAction({id: project.id, rate: r.data}))
                dispatch(ratedAction({id: project.id, rating: value}))
            })
        }
    }

    return (
        <div className={'flex items-center'} onClick={e => e.stopPropagation()}>
            <GiCheerful onClick={(e) => setRatingHandle(e, 1)}/>
            <GiCheerful onClick={(e) => setRatingHandle(e, 2)}/>
            <GiCheerful onClick={(e) => setRatingHandle(e, 3)}/>
            <GiCheerful onClick={(e) => setRatingHandle(e, 4)}/>
            <GiCheerful onClick={(e) => setRatingHandle(e, 5)}/>
            <div>{project.rate}</div>
        </div>
    );
};

export default Rating;