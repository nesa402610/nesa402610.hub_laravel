import React, {useEffect, useState} from 'react';
import {IKinopoiskItem, useGetKinopoiskDataQuery, useLazyGetKinopoiskDataByNameQuery} from "services/Kinopoisk";
import Paginator from "components/UI/Paginator";
import KinopoiskFilter from "components/Kinopoisk/KinopoiskFilter";
import KinopoiskItemCard from "components/Kinopoisk/KinopoiskItemCard";
import Loader from "components/Loader";

const Kinopoisk = () => {
    const [page, setPage] = useState(1);
    const [params, setParams] = useState({
        page,
        limit: '250',
        name: '',
        isSeries: false,
        year: '2005-2023',
        sortField: 'rating.kp',
        sortType: '-1',
        ageRating: '0-18',
        type: 'movie',
        // movieLength: '30-400',
        'rating.kp': '0-10',
    });

    const {data: movies, fulfilledTimeStamp: smartTime, isLoading} = useGetKinopoiskDataQuery({...params, page})

    const [getByName, {data: dataByName, fulfilledTimeStamp: nameTime}] = useLazyGetKinopoiskDataByNameQuery()

    const [data, setData] = useState(null);
    useEffect(() => {
        if (smartTime < nameTime) {
            setData(dataByName)
        } else {
            setData(movies)
        }
    }, [smartTime, nameTime]);
    if (isLoading) return <Loader/>
    return (
        <div className={'m-4'}>
            <KinopoiskFilter getByName={getByName} setParams={setParams}/>
            <div className={'mt-4'}>
                <div className={'grid grid-cols-5 gap-4'}>
                    {data?.docs.map((item: IKinopoiskItem) =>
                        <KinopoiskItemCard key={item.id} item={item}/>
                    )}
                </div>
                {
                    movies.pages &&
                    <Paginator totalPages={movies?.pages} currentPage={movies?.page} setCurrentPage={setPage}/>
                }
            </div>
        </div>
    );
};

export default Kinopoisk;
