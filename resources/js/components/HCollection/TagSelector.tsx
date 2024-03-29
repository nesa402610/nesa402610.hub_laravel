import React, {FC, useEffect, useState} from "react";
import Loader from "../Loader";
import {useGetTagsQuery} from "../../services/Collections/TagService";
import {ICollectionTag} from "../../types/Tag";
import {useAddTagToAnimeMutation} from "../../services/Collections/AnimeService";
import {ICollection} from "../../types/types";

interface TagSelectorProps {
    collection: ICollection;
}

const TagSelector: FC<TagSelectorProps> = ({collection}) => {
    const {data: tags, isLoading} = useGetTagsQuery();
    const [freeTags, setFreeTags] = useState<ICollectionTag[]>([]);
    const [tagSearch, setTagSearch] = useState('');
    const [rxSearch, setRxSearch] = useState(2);

    useEffect(() => {
        if (!tags) return;
        const itemTags = collection.tags;
        const freeTags = tags.filter(tag => !itemTags?.map(itemTag => itemTag.name).includes(tag.name));
        const freeTagsWithSearch = freeTags.filter(tag => tag.name.toLowerCase().includes(tagSearch.toLowerCase()) && tag.type !== rxSearch)
        setFreeTags(freeTagsWithSearch);
    }, [tags, collection, tagSearch, rxSearch]);

    const [addTag] = useAddTagToAnimeMutation();
    const addTagHandler = (titleId, tagId) => {
        addTag({titleId, tagId});
    };
    return (
        <div onClick={e => e.stopPropagation()}
             placeholder={'Школа'}
             className={"absolute p-2 rounded-lg min-w-[250px] h-[300px] overflow-hidden bg-neutral-800 flex flex-col gap-2 right-0"}>
            {isLoading ? <Loader/> :
                <>
                    <div className={'flex flex-col gap-2 bg-neutral-900 p-2 rounded-lg'}>
                        <input type="text" value={tagSearch}
                               onChange={e => setTagSearch(e.target.value)}
                               className={'w-full py-0'}/>
                        <div className={'flex items-center gap-2'}>
                            <span>Rx теги?</span>
                            <select className={'bg-neutral-600 rounded-lg flex-1'}
                                    value={rxSearch}
                                    onChange={e => setRxSearch(+e.target.value)}
                            >
                                <option value="2">Все теги</option>
                                <option value="0">Rx теги</option>
                                <option value="1">FF теги</option>
                            </select>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2 overflow-scroll'}>
                        {freeTags.map((tag: { id: number, name: string }) =>
                            <span key={tag.id} onClick={() => addTagHandler(collection.id, tag.id)}
                                  className={"bg-neutral-700 rounded-full px-2 whitespace-nowrap text-center hover:bg-neutral-600 transition-all cursor-pointer"}>
                                {tag.name}
                            </span>
                        )}
                    </div>
                </>}
        </div>
    );

};

export default TagSelector;
