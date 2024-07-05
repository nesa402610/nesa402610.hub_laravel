import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {changePreviewSize, clearFilter, setFilter} from "store/reducers/collectionSlice";
import RatingField from "./RatingField";
import IPPField from "./IPPField";
import TitleField from "./TitleField";
import YearsRange from "./YearsRange";
import Selector from "components/UI/Selector";
import {IoGrid, IoReorderFour} from "react-icons/io5";

const HCollectionFilter: FC = () => {
    const dispatch = useAppDispatch()
    const {filter, options} = useAppSelector(state => state.collection)
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
    useEffect(() => {
        const memFilter = JSON.parse(localStorage.getItem('memFilter'))
        setIPP(memFilter?.IPP ?? 15)
        setSort(memFilter?.sort ?? 'id')
    }, []);
    useEffect(() => {
        const memFilter = JSON.stringify({IPP, sort})
        localStorage.setItem('memFilter', memFilter)
    }, [IPP, sort]);

    const previewSizeHandle = () => {
        dispatch(changePreviewSize())
    };
    return (
        <div className={"flex sm:p-4 xs:p-2 flex-col gap-4 bg-neutral-700 rounded-lg md:order-2 "}>
            <h2 className={'font-bold text-neutral-300 -mb-2'}>Фильтрация</h2>
            <div className={"flex flex-col gap-4"}>
                <TitleField title={title} setTitle={setTitle} searchFn={searchWithFilterHandler}/>
                <div className={'flex gap-4 flex-col'}>
                    <div className={'flex flex-col gap-4'}>
                        <label>
                            <span className={'block'}>Тип</span>
                            <select value={kind} onChange={e => setKind(e.target.value)}
                                    className={'p-2 rounded-lg bg-neutral-600 w-full'}
                            >
                                <option value={''}>Любой</option>
                                <option value="tv">ТВ</option>
                                <option value="ova">OVA</option>
                                <option value="ona">ONA</option>
                                <option value="movie">Фильм</option>
                                <option value="special">Спешл</option>
                                <option value="music">Клип</option>
                            </select>
                        </label>
                        <RatingField rating={rating} setRating={setRating}/>
                    </div>
                    {/*<GenreField tags={tags} setTags={setTags}/>*/}
                    <Selector placeholder={'Жанры и теги'} selected={tags}
                              setSelected={setTags}/>
                </div>
                <div className={'flex gap-4 flex-col'}>
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
                    <YearsRange setYears={setYears} years={years}/>
                    <IPPField IPP={IPP} setIPP={setIPP}/>
                    <div className={'flex gap-4 items-center justify-between'}>
                        <span onClick={previewSizeHandle} className={'flex flex-col items-center justify-center'}>
                            <IoReorderFour className={`${!options.smallPreview && 'text-red-600'}`} size={'24px'}/>
                            <span className={` text-sm`}>Информативно</span>
</span>
                        <span onClick={previewSizeHandle} className={`flex flex-col items-center justify-center`}>
                            <IoGrid className={`${options.smallPreview && 'text-red-600'}`} size={'24px'}/>
                            <span className={`text-sm`}>Компактно</span>
                        </span>
                    </div>
                </div>
                <div className={'flex flex-col gap-4'}>
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
