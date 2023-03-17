import React from 'react';
import {useRemoveTagMutation} from "../../services/HCollectionService";
import {useGetUserQuery} from "../../services/userService";

const CollectionTags = ({collection}) => {
  const [removeTag, {}] = useRemoveTagMutation()
  const {data: user} = useGetUserQuery('')


  const deleteTagHandler = (titleId, tagId) => {
    removeTag({titleId, tagId})
  }
  return (
    <>
      {collection.tags.map(tag =>
        <div key={tag.tag_id}
             className={(tag.name === 'Золото' ? 'bg-amber-400 text-neutral-600' : tag.name === 'Серебро' ? 'bg-zinc-500' : tag.name === 'Медь' ? 'bg-amber-700' : 'bg-neutral-800') + '  px-2 rounded-full flex items-center'}>
          <span className={'whitespace-nowrap'}>{tag.name}</span>
          {user.id === 1 &&
            <span onClick={() => deleteTagHandler(collection.id, tag.tag_id)}
                  className={'cursor-pointer ml-2 px-1 bg-neutral-700 text-white rounded-full leading-none bg-neutral-700 text-inherit'}>
                              -
                            </span>
          }
        </div>
      )}
    </>
  );
};

export default CollectionTags;
