import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {clearFilter, setFilter, setFilterType} from "../../../store/reducers/collectionSlice";
import GenreField from "./GenreField";
import RatingField from "./RatingField";
import IPPField from "./IPPField";
import TitleField from "./TitleField";
import YearsRange from "./YearsRange";

const HCollectionFilter: FC = () => {
    const dispatch = useAppDispatch()
    const {filter: {type, years: yearsRange}} = useAppSelector(state => state.collection)
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [rating, setRating] = useState('');
    const [sort, setSort] = useState('id');
    const [IPP, setIPP] = useState(15);
    const [years, setYears] = useState(yearsRange);

    const clearFilterHandler = () => {
        dispatch(clearFilter())
        setTitle('')
        setTags([])
        setRating('')
    }

    const searchWithFilterHandler = async () => {
        dispatch(setFilter({title, tags, rating, IPP, sort, years}))
    }
    const typeHandler = (e) => {
        dispatch(setFilterType(e.target.value))
        if (e.target.value === 'anime') {
            nav('a')
        } else nav('m')
    }
    useEffect(() => {
        const memFilter = JSON.parse(localStorage.getItem('memFilter'))
        setIPP(memFilter?.IPP ?? 15)
        setSort(memFilter?.sort ?? 'id')
    }, []);
    useEffect(() => {
        const memFilter = JSON.stringify({IPP, sort})
        localStorage.setItem('memFilter', memFilter)
    }, [IPP, sort]);

    return (
        <div className={"flex sm:p-4 xs:p-2 flex-col gap-4"}>
            <div className={'flex gap-4 xs:flex-col sm:flex-row'}>
                <TitleField title={title} setTitle={setTitle}/>
                <IPPField IPP={IPP} setIPP={setIPP}/>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div className={'flex gap-4 xs:flex-col sm:flex-row'}>
                    <div className={'flex gap-4'}>
                        <div className={'flex flex-col flex-1'}>
                            <span className={'block'}>Тип</span>
                            <select className={"bg-neutral-600 p-2 rounded-lg"}
                                    value={type}
                                    onChange={e => typeHandler(e)}>
                                <option value="anime">Аниме</option>
                                <option value="manga">Манга</option>
                            </select>
                        </div>
                        <RatingField rating={rating} setRating={setRating}/>
                    </div>
                    <GenreField tags={tags} setTags={setTags}/>
                </div>
                <div className={'flex gap-4 items-center xs:flex-col md:flex-row'}>
                    <div className={'w-full'}>
                        <span>Сортировка</span>
                        <select className={'p-2 rounded-lg bg-neutral-600 w-full'}
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                        >
                            <option value="id">По порядку</option>
                            <option value="title_original">По алфавиту</option>
                            <option value="release_date">по дате релиза</option>
                        </select>
                    </div>
                    <YearsRange setYears={setYears}/>
                </div>
                <div className={'flex sm:flex-row xs:flex-col gap-4'}>
                    <button onClick={searchWithFilterHandler} className={'bg-red-700 hover:bg-red-800'}>Поиск с фильтром
                    </button>
                    <button onClick={clearFilterHandler} className={'bg-neutral-600 hover:bg-neutral-700'}>Сбросить
                        фильтры
                    </button>
                </div>
                {/*<Selector data={[1, 2, 3]} freeItems={()=>freeTagsHandler()}>*/}
                {/*  {tags?.filter(tag => !filter.tags.map(itemTag => itemTag).includes(tag.name)).map(t =>*/}
                {/*    <span>{t.name}</span>*/}
                {/*  )}*/}
                {/*</Selector>*/}
            </div>
        </div>
    );
};

export default HCollectionFilter;
