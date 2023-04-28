import React, {useState} from "react";

const ListItem = ({id, name, updateFn}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  const updateHandler = (e) => {
    if (e.key === "Escape") {
      setNewName(name);
      return setIsEdit(false);
    }
    if (e.key === "Enter" && newName.length !== 0) {
      updateFn({id: id, name: newName});
      setIsEdit(false);
    }
  };
  if (isEdit) {
    return (
      <input type={"text"}
             value={newName}
             autoFocus
             onChange={e => setNewName(e.target.value)}
             onKeyUp={e => updateHandler(e)}/>
    );
  }
  return (
    <div className={"flex bg-slate-600 p-2 rounded-lg"} onDoubleClick={() => setIsEdit(true)}>
      <span>{id}&nbsp;{name}</span>
    </div>
  );
};

export default ListItem;
