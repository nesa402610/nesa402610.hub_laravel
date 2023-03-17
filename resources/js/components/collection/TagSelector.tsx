import React, {FC, useEffect, useState} from 'react';
import {useAddTagToCollectionMutation, useGetCollectionTagsQuery} from "../../services/HCollectionService";
import {ICollection, ICollectionTag} from "../../types/types";
import Loader from "../Loader";

interface TagSelectorProps {
  collection: ICollection
}

const TagSelector: FC<TagSelectorProps> = ({collection}) => {
  const {data: tags, isLoading} = useGetCollectionTagsQuery('')
  const [addTag, {}] = useAddTagToCollectionMutation()
  const [freeTags, setFreeTags] = useState<ICollectionTag[]>([]);

  useEffect(() => {
    if (!tags) return
    const itemTags = collection.tags
    const freeTags = tags.filter(tag => !itemTags.map(itemTag => itemTag.name).includes(tag.name))
    setFreeTags(freeTags)
  }, [tags, collection]);

  const addTagHandler = (titleId, tagId) => {
    addTag({titleId, tagId})
  }
  if (isLoading) return <Loader/>
  return (
    <>
      {freeTags.map((tag: {id: number, name: string}) =>
        <span className={'bg-neutral-700 rounded-full px-2 whitespace-nowrap text-center hover:bg-neutral-600 transition-all cursor-pointer'} key={tag.id} onClick={() => addTagHandler(collection.id, tag.id)}>
          {tag.name}
        </span>
      )}
    </>
  )

};

export default TagSelector;
