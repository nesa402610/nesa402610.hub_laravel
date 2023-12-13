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
    const [type, setType] = useState(666);

    useMemo(() => {
        if (!tags) return;
        const itemTags = collectionTags;
        const freeTags = tags.filter(tag => !itemTags?.map(itemTag => itemTag.name).includes(tag.name));
        const freeTagsWithSearch = freeTags.filter(tag => tag.name.toLowerCase().includes(tagSearch.toLowerCase()))
        const freeTagsWithSearchAndType = freeTagsWithSearch.filter(tag => {
            if (type === 666) return true
            else return tag.type === type
            // if(tagType === 'genre' && (tag.type === 2 || tag.type === 3)) {
            //     return tag.type === type
            // }
        })
        setFreeTags(freeTagsWithSearchAndType);
    }, [tags, collectionTags, tagSearch, type]);

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
                            <span>Сортировка</span>
                            <select className={'bg-neutral-600 rounded-lg flex-1'}
                                    value={type}
                                    onChange={e => setType(+e.target.value)}
                            >
                                <option value={'all'}>Все {tagType === 'tag' ? 'теги' : 'жанры'}</option>
                                {tagType === 'tag' ?
                                    <>
                                        <option value="0">FF теги</option>
                                        <option value="1">Rx теги</option>
                                    </>
                                    :
                                    <>
                                        <option value="3">FF жанры</option>
                                        <option value="2">Rx жанры</option>
                                    </>
                                }
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
