import React, {FC, useEffect, useState} from "react";
import Loader from "../Loader";
import {useGetTagsQuery} from "../../services/Collections/TagService";
import {ICollectionTag} from "../../types/Tag";
import {IAnime} from "../../types/Anime";

interface TagSelectorProps {
    collection: IAnime;

    addTag({titleId, tagId}): any;

    onBlur(b): boolean
}

const TagSelector: FC<TagSelectorProps> = ({collection, addTag, onBlur}) => {
    const {data: tags, isLoading} = useGetTagsQuery();
    const [freeTags, setFreeTags] = useState<ICollectionTag[]>([]);
    const [tagSearch, setTagSearch] = useState('');

    useEffect(() => {
        if (!tags) return;
        const itemTags = collection.tags;
        const freeTags = tags.filter(tag => !itemTags?.map(itemTag => itemTag.name).includes(tag.name));
        setFreeTags(freeTags.filter(tag => tag.name.includes(tagSearch)));
    }, [tags, collection, tagSearch]);

    const addTagHandler = (titleId, tagId) => {
        addTag({titleId, tagId});
    };
    return (
        <div onClick={e => e.stopPropagation()}
             onBlur={onBlur}
             placeholder={'Школа'}
             className={"absolute p-2 rounded-lg min-w-[250px] h-[200px] overflow-hidden bg-neutral-800 flex flex-col gap-2"}>
            {isLoading ? <Loader/> :
                <>
                    <div>
                        <input type="text" value={tagSearch}
                               onChange={e => setTagSearch(e.target.value)}
                               className={'w-full py-0'}/>
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
