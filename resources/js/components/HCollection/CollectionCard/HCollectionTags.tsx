import React, {FC, useState} from 'react';
import TagSelector from "components/HCollection/TagSelector";
import {useRemoveTagMutation} from "services/Collections/AnimeService";
import {ICollectionTag} from "types/Tag";
import {useGetUserQuery} from "services/userService";

interface HCollectionTagsProps {
    collectionTags: ICollectionTag[]
    collectionID: number | string
}

const HCollectionTags: FC<HCollectionTagsProps> = ({collectionTags, collectionID}) => {
    const {data: user} = useGetUserQuery()
    const isAdmin = user?.role[0].name === 'Admin'
    const [removeTag] = useRemoveTagMutation();

    const [tagDropDown, setTagDropDown] = useState(false);
    const deleteTagHandler = (titleId, tagId) => {
        if (isAdmin) removeTag({titleId, tagId, tagType: 'tag'});
    };
    return (
        <div className={'text-sm text-neutral-400 flex flex-wrap gap-x-1'}>
            <span>Теги:&nbsp;</span>
            {collectionTags.map((tag) =>
                (
                    <span onClick={() => deleteTagHandler(collectionID, tag.tag_id)}
                          className={'px-2 bg-neutral-800 rounded-full'}
                          key={tag.tag_id}>
                                {tag.name}
                            </span>
                )
            )}
            {isAdmin &&
                <div onClick={() => setTagDropDown(prev => !prev)}
                     className={"bg-neutral-800 px-2 rounded-full relative"}>
                    +
                    {tagDropDown &&
                        <TagSelector tagType={'tag'} collectionID={collectionID}
                                     collectionTags={collectionTags}/>
                    }
                </div>
            }
        </div>
    );
};

export default HCollectionTags;
