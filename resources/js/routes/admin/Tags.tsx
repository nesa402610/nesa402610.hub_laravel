import React, {useState} from "react";
import {useCreateTagMutation, useGetTagsQuery, useUpdateTagMutation} from "../../services/Collections/TagService";

const Tag = ({name, id}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [updateTag] = useUpdateTagMutation();

  const updateTagHandler = (e) => {
    if (e.key === "Escape") {
      setNewName(name);
      return setIsEdit(false);
    }
    if (e.key === "Enter" && newName.length !== 0) {
      updateTag({tagId: id, tagName: newName});
      setIsEdit(false);
    }
  };
  if (isEdit) {
    return (
      <input type={"text"}
             value={newName}
             autoFocus
             onChange={e => setNewName(e.target.value)}
             onKeyUp={e => updateTagHandler(e)}/>
    );
  }
  return (
    <div className={"flex bg-slate-600 p-2 rounded-lg"} onDoubleClick={() => setIsEdit(true)}>
      <span>{id}&nbsp;{name}</span>
    </div>
  );
};

const Tags = () => {
  const {data} = useGetTagsQuery("");
  const [tag, setTag] = useState("");
  const [createTag, {error}] = useCreateTagMutation();
  return (
    <div className={"flex flex-col gap-4"}>
      <div className={"flex flex-col"}>
        <div className={"flex gap-4"}>
          <input type="text"
                 placeholder={"Название тега"}
                 autoComplete={"false"}
                 value={tag}
                 onChange={e => setTag(e.target.value)}/>
          <button className={"bg-slate-700 px-8"} onClick={() => createTag(tag)}>Добавить</button>
        </div>
        {error && <span className={"text-red-500 font-bold"}>"{tag}" уже существует</span>}
      </div>
      <div>
        <span>Всего тегов: {data?.length}</span>
      </div>
      {data?.map(tag =>
        <Tag key={tag.id} id={tag.id} name={tag.name}/>
      )}
    </div>
  );
};

export default Tags;
