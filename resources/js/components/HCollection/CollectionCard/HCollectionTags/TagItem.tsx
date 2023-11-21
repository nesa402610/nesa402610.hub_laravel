import React, {FC} from 'react';
import {useRemoveTagMutation} from "services/Collections/AnimeService";

interface TagItemProps {
    isAdmin: boolean
    collectionID: number | string
    id: number
    name: string
}

const TagItem: FC<TagItemProps> = ({isAdmin, collectionID, id, name}) => {
    const [removeTag] = useRemoveTagMutation();
    const deleteTagHandler = (titleId, tagId: number) => {
        if (isAdmin) removeTag({titleId, tagId, tagType: 'tag'});
    };
    return (
        <span onClick={() => deleteTagHandler(collectionID, id)}
              className={'px-2 bg-neutral-800 rounded-full'}
              key={id}>
                                {name}
                            </span>
    );
};

export default TagItem;
