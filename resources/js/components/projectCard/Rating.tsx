import React from 'react';
import {useDispatch} from "react-redux";
import axios from "axios";
import {GiCheerful} from 'react-icons/gi';
import {IUser} from "../../types/types";
import {rated} from "../../store/reducers/authSlice";
import {useAppSelector} from "../../hooks/redux";
import {setRating} from "../../store/reducers/homePageSlice";

const Rating = ({project}) => {
    const dispatch = useDispatch()
    const user = useAppSelector(state => state.auth.user) as IUser
    const setRatingHandle = (e, value) => {
        if (project.status !== 'Planned' &&
            user &&
            user.rates.filter(item => item.project_id === project.id).length <= 0
        ) {
            axios.post('/setRating', {
                project_id: project.id,
                rating: value
            }).then(r => {
                dispatch(setRating({id: project.id, rate: r.data}))
                dispatch(rated({id: project.id, rating: value}))
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
