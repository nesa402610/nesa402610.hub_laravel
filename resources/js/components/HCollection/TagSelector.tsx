import React, {FC, useMemo, useState} from "react";
import Loader from "../Loader";
import {useGetTagsQuery} from "services/Collections/TagService";
import {ICollectionTag, ITags} from "types/Tag";
import {useAddTagToAnimeMutation} from "services/Collections/AnimeService";

interface TagSelectorProps {
    collectionTags: ICollectionTag[];
    collectionID: string | number
    tagType: 'genre' | 'tag'
}

const TagSelector: FC<TagSelectorProps> = ({collectionTags, collectionID, tagType = 'tag'}) => {
    const {data: tags, isLoading} = useGetTagsQuery();
    const [freeTags, setFreeTags] = useState([]);
    const [tagSearch, setTagSearch] = useState('');
    const [rxSearch, setRxSearch] = useState(null);

    useMemo(() => {
        if (!tags) return;
        const itemTags = collectionTags;
        const freeTags = tags.filter(tag => !itemTags?.map(itemTag => itemTag.name).includes(tag.name));
        const freeTagsWithSearch = freeTags.filter(tag => tag.name.toLowerCase().includes(tagSearch.toLowerCase()) && tag.type !== rxSearch)
        setFreeTags(freeTagsWithSearch);
    }, [tags, collectionTags, tagSearch, rxSearch]);

    const [addTag] = useAddTagToAnimeMutation();
    const addTagHandler = (titleId: string | number, tagId: number) => {
        addTag({titleId, tagId, tagType});
    };
    return (
        <div onClick={e => e.stopPropagation()}
             placeholder={'Школа'}
             className={"absolute p-2 rounded-lg min-w-[250px] h-[300px] overflow-hidden bg-neutral-800 flex flex-col gap-2 right-0 z-50 left-0 text-base text-white"}>
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
                                <option value={null}>Все теги</option>
                                <option value="0">Rx теги</option>
                                <option value="1">FF теги</option>
                            </select>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2 overflow-scroll'}>
                        {freeTags.map((tag: ITags) =>
                            <span key={tag.id} onClick={() => addTagHandler(collectionID, tag.id)}
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
