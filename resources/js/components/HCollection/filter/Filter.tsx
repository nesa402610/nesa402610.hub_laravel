import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {clearFilter, setFilter, setFilterType} from "../../../store/reducers/collectionSlice";
import GenreField from "./GenreField";
import RatingField from "./RatingField";
import IPPField from "./IPPField";

const HCollectionFilter: FC = () => {
    const dispatch = useAppDispatch()
    const {filter: {type}} = useAppSelector(state => state.collection)
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [rating, setRating] = useState('');
    const [IPP, setIPP] = useState(15);

    const clearFilterHandler = () => {
        dispatch(clearFilter())
        setTitle('')
        setTags([])
        setRating('')
        setIPP(15)
    }
    const searchWithFilterHandler = async () => {
        dispatch(setFilter({title, tags, rating, IPP}))

    }
    const typeHandler = (e) => {
        dispatch(setFilterType(e.target.value))
        if (e.target.value === 'anime') {
            nav('a')
        } else nav('m')
    }

    return (
        <div className={"flex sm:p-4 xs:p-2 flex-col gap-4"}>
            <div className={'flex gap-4'}>
                <label className={'flex flex-col w-full'}>
                    <span>Название</span>
                    <input type="text"
                           value={title}
                           placeholder={'Мастер меча онлайн'}
                           onChange={e => setTitle(e.target.value)}/>
                </label>
                <IPPField IPP={IPP} setIPP={setIPP}/>
            </div>
            <div className={"flex flex-col gap-4"}>
                <div className={'flex gap-4'}>
                    <div>
                        <span className={'block'}>Тип</span>
                        <select className={"bg-neutral-600 p-2 rounded-lg"}
                                value={type}
                                onChange={e => typeHandler(e)}>
                            <option value="anime">Аниме</option>
                            <option value="manga">Манга</option>
                        </select>
                    </div>
                    <RatingField rating={rating} setRating={setRating}/>
                    <GenreField tags={tags} setTags={setTags}/>
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
