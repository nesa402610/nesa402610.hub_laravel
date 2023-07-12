import React from "react";
import {useGetUserQuery} from "../../services/userService";
import {useRemoveTagMutation} from "../../services/Collections/AnimeService";

const HCollectionTags = ({tags, collectionID}) => {
    const {data: user} = useGetUserQuery();
    const [removeTag] = useRemoveTagMutation();

    const deleteTagHandler = (titleId, tagId) => {
        removeTag({titleId, tagId});
    };
    return (
        <>
            {tags?.map(tag =>
                <div key={tag.tag_id}
                     className={(tag.name === "Золото" ? "bg-amber-400 text-neutral-600" : tag.name === "Серебро" ? "bg-zinc-500" : tag.name === "Медь" ? "bg-amber-700" : "bg-neutral-800") + "  px-2 rounded-full flex items-center"}>
                    <span className={"whitespace-nowrap"}>{tag.name}</span>
                    {user?.role[0]?.name === 'Admin' &&
                        <span onClick={() => deleteTagHandler(collectionID, tag.tag_id)}
                              className={"cursor-pointer ml-2 px-1 bg-neutral-700 text-white rounded-full leading-none text-inherit"}>
                              -
                            </span>
                    }
                </div>
      )}
    </>
  );
};

export default HCollectionTags;
