import React, {FC} from 'react';
import {IAnimeTag} from "types/Tag";
import {useGetUserQuery} from "services/userService";
import TagItem from "components/Anime/AnimeCard/AnimeTags/TagItem";
import AdminTagSelector from "components/Anime/AnimeCard/AdminTagSelector";

interface HCollectionTagsProps {
    collectionTags: IAnimeTag[]
    collectionID: number | string
}

const AnimeTags: FC<HCollectionTagsProps> = ({collectionTags, collectionID}) => {
    const {data: user} = useGetUserQuery()
    const isAdmin = user?.role[0].name === 'Admin'

    return (
        <div className={'text-sm text-neutral-400 flex flex-wrap gap-x-1'}>
            <span>Теги:&nbsp;</span>
            {collectionTags?.map((tag) =>
                <TagItem key={tag.name} isAdmin={isAdmin} collectionID={collectionID} id={tag.tag_id} name={tag.name}/>
            )}
            <AdminTagSelector type={'tag'} collectionID={collectionID} items={collectionTags}/>
        </div>
    );
};

export default AnimeTags;
