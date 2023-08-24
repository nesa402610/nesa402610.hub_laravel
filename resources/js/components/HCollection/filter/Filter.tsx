import React, {FC, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {clearFilter, setFilter, setFilterType} from "store/reducers/collectionSlice";
import GenreField from "./GenreField";
import RatingField from "./RatingField";
import IPPField from "./IPPField";
import TitleField from "./TitleField";
import YearsRange from "./YearsRange";

const HCollectionFilter: FC = () => {
    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.collection)
    const nav = useNavigate();
    const [title, setTitle] = useState(filter.title);
    const [tags, setTags] = useState(filter.tags);
    const [rating, setRating] = useState(filter.rating);
    const [sort, setSort] = useState(filter.sort);
    const [IPP, setIPP] = useState(filter.IPP);
    const [years, setYears] = useState(filter.years);
    const [kind, setKind] = useState(filter.kind);

    const clearFilterHandler = () => {
        dispatch(clearFilter())
        setTitle(filter.title)
        setTags(filter.tags)
        setRating(filter.rating)
    }

    const searchWithFilterHandler = () => {
        dispatch(setFilter({title, tags, rating, IPP, sort, years, kind}))
    }
    const typeHandler = (e) => {
        dispatch(setFilterType(e.target.value))
        if (e.target.value === 'anime') {
            nav('ZERO')
        } else nav('ONE')
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
                <TitleField title={title} setTitle={setTitle} searchFn={searchWithFilterHandler}/>
                <IPPField IPP={IPP} setIPP={setIPP}/>
                <label>
                    Тип
                    <select value={kind} onChange={e => setKind(e.target.value)}
                            className={'p-2 mt-1 rounded-lg bg-neutral-600'}
                    >

                        <option value={null}>Все</option>
                        <option value="tv">ТВ</option>
                        <option value="ova">OVA</option>
                        <option value="ona">ONA</option>
                        <option value="movie">Фильм</option>
                        <option value="special">Спешл</option>
                        <option value="music">Клип</option>
                    </select>
                </label>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div className={'flex gap-4 xs:flex-col sm:flex-row'}>
                    <div className={'flex gap-4'}>
                        <div className={'flex flex-col flex-1'}>
                            <span className={'block'}>Тип</span>
                            <select className={"bg-neutral-600 p-2 rounded-lg"}
                                    value={filter.type}
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
