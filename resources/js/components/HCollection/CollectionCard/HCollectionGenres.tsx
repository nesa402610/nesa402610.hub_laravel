import React, {useState} from "react";
import {useGetUserQuery} from "services/userService";
import {useRemoveTagMutation} from "services/Collections/AnimeService";
import TagSelector from "../TagSelector";
import {ICollectionTag} from "types/Tag";

const HCollectionGenres = ({genres, collectionID, collection}) => {
    const {data: user} = useGetUserQuery();
    const [removeTag] = useRemoveTagMutation();

    const [tagDropDown, setTagDropDown] = useState(false);
    const deleteTagHandler = (titleId, tagId) => {
        removeTag({titleId, tagId, tagtype: 'genre'});
    };
    return (
        <span className={"flex gap-1 md:flex-nowrap xs:flex-wrap"}>
            Жанры:
            <div className={"flex gap-1 flex-wrap"}>
                {genres?.map((genre: ICollectionTag) =>
                    <div key={genre.tag_id}
                         className={(genre.name === "Золото" ? "bg-amber-400 text-neutral-600" : genre.name === "Серебро" ? "bg-zinc-500" : genre.name === "Медь" ? "bg-amber-700" : "bg-neutral-800") + "  px-2 rounded-full flex items-center"}>
                        <span className={"whitespace-nowrap"}>{genre.name}</span>
                        {user?.role[0]?.name === 'Admin' &&
                            <span onClick={() => deleteTagHandler(collectionID, genre.tag_id)}
                                  className={"cursor-pointer ml-2 px-1 bg-neutral-700 text-white rounded-full leading-none text-inherit"}>
                                  -
                            </span>
                        }
                    </div>
                )}
                {user?.role[0]?.name === 'Admin' &&
                    <div onClick={() => setTagDropDown(prev => !prev)}
                         className={"bg-neutral-800 px-2 rounded-full relative"}>
                        +
                        {tagDropDown &&
                            <TagSelector tagType={'genre'} collectionID={collectionID}
                                         collectionTags={collection.tags}/>
                        }
                    </div>
                }
                </div>
        </span>
    );
};

export default HCollectionGenres;
