import React, {FC, useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "hooks/redux";
import {setFilterType} from "store/reducers/collectionSlice";
import Filter from "../components/HCollection/filter/Filter";

export const filterCollection = (collections, filter) => {
    const filteredByTitle = collections?.data.filter(c => c.title_ru.toLowerCase().includes(filter.title.toLowerCase()));
    return filteredByTitle?.filter(item => {
        return filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf));
    });
};
const HHHPage: FC = () => {
    const location = useLocation();
    const dispatch = useAppDispatch()
    const nav = useNavigate();
    useEffect(() => {
        if (/unit\/ONE$/.test(location.pathname)) {
            dispatch(setFilterType('manga'))
        } else {
            nav("/NULL/unit/ZERO", {replace: true});
            dispatch(setFilterType('anime'))
        }
    }, []);

    return (
        <div className={"m-4"}>
            <div className={"bg-neutral-800 rounded-lg pt-4 flex flex-col gap-4 mt-4"}>
                <div className={'p-4'}>
                    <h1 className={"text-center font-bold text-2xl"}>Добро пожаловать в зону души!</h1>
                    <h3 className={"text-sm text-neutral-500 italic text-end mr-2"}>
                        Я не при делах если что. Все данные взяты с открытых источников.
                    </h3>
                </div>
                <div className={"flex flex-col gap-4"}>
                    <Filter/>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default HHHPage;
