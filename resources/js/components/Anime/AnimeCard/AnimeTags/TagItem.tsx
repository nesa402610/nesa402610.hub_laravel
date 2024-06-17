import React, {FC} from 'react';
import {useRemoveTagMutation} from "services/Anime/AnimeService";
import Bauble from "components/UI/Bauble";

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
        <Bauble onClick={() => deleteTagHandler(collectionID, id)}
                key={id}>
            {name}
        </Bauble>
    );
};

export default TagItem;
