import React, {FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {clearFilter, setFilterTags, setFilterTitle, setFilterType} from "../../store/reducers/collectionSlice";
import {useGetTagsQuery} from "../../services/Collections/TagService";

const HCollectionFilter: FC = () => {
    const {data: dataTags} = useGetTagsQuery()
    const dispatch = useAppDispatch()
    const {filter, filteredCollection} = useAppSelector(state => state.collection)
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);

    const typeHandler = (e) => {
        if (e.target.value === "anime") {
            nav("a");
        } else {
            nav("m");
        }
        dispatch(setFilterType(e.target.value))
    };

    const clearFilterHandler = () => {
        dispatch(clearFilter())
        setTitle('')
        setTags([])
    }
    const searchWithFilterHandler = () => {
        dispatch(setFilterTags(tags))
        dispatch(setFilterTitle(title))
    }

    return (
        <div className={"flex sm:p-4 xs:p-2 flex-col gap-4"}>
            <input type="text"
                   value={title}
                   placeholder={'Название'}
                   onChange={e => setTitle(e.target.value)}/>
            <div className={"flex flex-col gap-4"}>
                <div className={'flex gap-4'}>
                    <select className={"bg-neutral-600 p-2 rounded-lg"}
                            value={filter.type}
                            onChange={e => typeHandler(e)}>
                        <option value="anime">Аниме</option>
                        <option value="manga">Манга</option>
                    </select>
                    <div className={"flex gap-1 flex-wrap items-center bg-neutral-600 xs:w-full p-2 rounded-lg"}>
                        {!tags.length ? <span>Жанры</span> : ''}
                        {tags.map(tag =>
                            <span key={tag}
                                  onClick={() => setTags(tags.filter(tagName => tagName !== tag))}
                                  className={"bg-neutral-800 rounded-full px-2 hover:cursor-pointer"}>{tag}</span>
                        )}

                        <select className={"outline-0 w-3 bg-neutral-600 rounded-lg"}
                                value=""
                                placeholder={"Жанры"}
                                onChange={e => setTags([...tags, e.target.value])}>
                            <option value=""></option>
                            {dataTags?.map(dataTag => {
                                if (!tags.map(tag => tag).includes(dataTag.name)) {
                                    return <option key={dataTag.id} value={dataTag.name}
                                    >{dataTag.name}</option>
                                }
                            })}
                        </select>
                    </div>
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
