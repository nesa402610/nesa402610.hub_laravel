import React from 'react';
import {useDispatch} from "react-redux";
import {setRatingAction} from "../../store/homePageReducer";
import axios from "axios";
import { GiCheerful } from 'react-icons/gi';

const Rating = ({project}) => {
    const dispatch = useDispatch()
    const setRatingHandle = (e, value) => {
        axios.post('/setRating/', {
            project_id: project.id,
            rating: value
        }).then(r=> {
            dispatch(setRatingAction({id: project.id, rate: r.data}))
        })
    }

    return (
        <div className={'flex'} onClick={e => e.stopPropagation()}>
            <GiCheerful onClick={(e)=> setRatingHandle(e, 1)}/>
            <GiCheerful onClick={(e)=> setRatingHandle(e, 2)}/>
            <GiCheerful onClick={(e)=> setRatingHandle(e, 3)}/>
            <GiCheerful onClick={(e)=> setRatingHandle(e, 4)}/>
            <GiCheerful onClick={(e)=> setRatingHandle(e, 5)}/>
            <div>{project.rate}</div>
        </div>
    );
};

export default Rating;
