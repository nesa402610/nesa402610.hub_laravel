import React, {FC, useEffect, useState} from "react";
import {ICollection} from "../../types/types";
import Loader from "../Loader";
import {useGetTagsQuery} from "../../services/Collections/TagService";
import {ICollectionTag} from "../../types/Tag";

interface TagSelectorProps {
  collection: ICollection;

  addTag({titleId, tagId}): any;
}

const TagSelector: FC<TagSelectorProps> = ({collection, addTag}) => {
  const {data: tags, isLoading} = useGetTagsQuery("");
  const [freeTags, setFreeTags] = useState<ICollectionTag[]>([]);

  useEffect(() => {
    if (!tags) return;
    const itemTags = collection.tags;
    const freeTags = tags.filter(tag => !itemTags?.map(itemTag => itemTag.name).includes(tag.name));
    setFreeTags(freeTags);
  }, [tags, collection]);

  const addTagHandler = (titleId, tagId) => {
    addTag({titleId, tagId});
  };
  if (isLoading) return <Loader/>;
  return (
    <>
      {freeTags.map((tag: { id: number, name: string }) =>
        <span className={"bg-neutral-700 rounded-full px-2 whitespace-nowrap text-center hover:bg-neutral-600 transition-all cursor-pointer"}
              key={tag.id}
              onClick={() => addTagHandler(collection.id, tag.id)}>
          {tag.name}
        </span>
      )}
    </>
  );

};

export default TagSelector;
