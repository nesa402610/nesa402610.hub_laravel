import React, {FC, useState} from 'react';
import AdminChecker from "components/AdminChecker";
import {ICollectionTag} from "types/Tag";
import TagSelector from "components/HCollection/TagSelector";

interface TagSelectorProps {
    collectionID: number | string
    items: ICollectionTag[]
    type: 'genre' | 'tag'
}

const AdminTagSelector: FC<TagSelectorProps> = ({collectionID, items, type = 'genre'}) => {
    const [tagDropDown, setTagDropDown] = useState(false);

    return (
        <AdminChecker>
            <div onClick={() => setTagDropDown(prev => !prev)}
                 className={"bg-neutral-800 px-2 rounded-full relative"}>
                +
                {tagDropDown &&
                    <TagSelector tagType={type} collectionID={collectionID}
                                 collectionTags={items}/>
                }
            </div>
        </AdminChecker>
    );
};

export default AdminTagSelector;
