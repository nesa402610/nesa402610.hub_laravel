import React, {Dispatch, FC, SetStateAction, useRef} from 'react';
import {useGetTagsQuery} from "../../../services/Collections/TagService";

interface GenreFieldProps {
    tags: string[]
    setTags: Dispatch<SetStateAction<any[]>>
}

const GenreField: FC<GenreFieldProps> = ({tags, setTags}) => {
    const {data: dataTags} = useGetTagsQuery()
    const ref = useRef()

    return (
        <div className={'w-full'}>
            <span className={'block'}>Жанры</span>
            <div className={"flex gap-1 flex-wrap items-center bg-neutral-600 xs:w-full p-2 rounded-lg"}>
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
    );
};

export default GenreField;
