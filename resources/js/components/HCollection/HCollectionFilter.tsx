import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {removeTag, setFilterTags, setFilterTitle} from "../../store/reducers/collectionSlice";
import {useGetTagsQuery} from "../../services/Collections/TagService";

const HCollectionFilter: FC = () => {
    const {data: dataTags} = useGetTagsQuery('')
    const dispatch = useAppDispatch()
    const {filter, filteredCollection} = useAppSelector(state => state.collection)
    const nav = useNavigate();
    const typeHandler = async (e) => {
        if (e.target.value === "anime") {
            nav("a");
        } else {
            nav("m");
        }
    };

    return (
        <div className={"flex sm:p-4 xs:p-2 flex-col gap-4"}>
            <input type="text"
                   value={filter.title}
                   onChange={e => dispatch(setFilterTitle(e.target.value))}/>
            <div className={"flex gap-4"}>
                <select className={"bg-neutral-600 p-2 rounded-lg"}
                        value={filter.type}
                        onChange={e => typeHandler(e)}>
                    <option value="anime">Аниме</option>
                    <option value="manga">Манга</option>
                </select>
                <div className={"flex gap-1 flex-wrap items-center bg-neutral-600 min-w-[200px]  p-2 rounded-lg"}>
                    {!filter.tags.length ? <span>Жанры</span> : ''}
                    {filter.tags.map(tag =>
                        <span key={tag}
                              onClick={() => dispatch(removeTag(tag))}
                              className={"bg-neutral-800 rounded-full px-2 hover:cursor-pointer"}>{tag}</span>
                    )}

                    <select className={"outline-0 w-3 bg-neutral-600 rounded-lg"}
                            value=""
                            placeholder={"Жанры"}
                            onChange={e => dispatch(setFilterTags(e.target.value))}>
                        <option value=""></option>
                        {dataTags?.map(dataTag => {
                            if (!filter.tags.map(tag => tag).includes(dataTag.name)) {
                                return <option key={dataTag.id} value={dataTag.name}
                                >{dataTag.name}</option>
                            }
                        })}
                    </select>
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
