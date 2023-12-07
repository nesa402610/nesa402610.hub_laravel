import React, {FC} from 'react';
import {ICollectionTag} from "types/Tag";
import {useGetUserQuery} from "services/userService";
import TagItem from "components/HCollection/CollectionCard/HCollectionTags/TagItem";
import AdminTagSelector from "components/HCollection/CollectionCard/AdminTagSelector";

interface HCollectionTagsProps {
    collectionTags: ICollectionTag[]
    collectionID: number | string
}

const HCollectionTags: FC<HCollectionTagsProps> = ({collectionTags, collectionID}) => {
    const {data: user} = useGetUserQuery()
    const isAdmin = user?.role[0].name === 'Admin'

    return (
        <div className={'text-sm text-neutral-400 flex flex-wrap gap-x-1'}>
            <span>Теги:&nbsp;</span>
            {collectionTags?.map((tag) =>
                <TagItem isAdmin={isAdmin} collectionID={collectionID} id={tag.tag_id} name={tag.name}/>
            )}
            <AdminTagSelector type={'tag'} collectionID={collectionID} items={collectionTags}/>
        </div>
    );
};

export default HCollectionTags;
