import React, {FC, useState} from 'react';
import {useGetUserQuery} from "../../services/userService";
import {useUpdateTitleMutation} from "../../services/HCollectionService";
import {ICollection} from "../../types/types";


interface EditableSpanProps {
  data: ICollection
  datakey: Exclude<keyof ICollection, 'tags' | 'links' | 'id' | 'censure' | 'studios'>
}

const EditableSpan: FC<EditableSpanProps> = ({data, datakey}) => {
  const {data: user} = useGetUserQuery('')
  const [updateTitle] = useUpdateTitleMutation()
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(data[datakey]);

  const updateValueHandler = () => {
    updateTitle(data)
  }
  const editHandler = () => {
    if (user.id !== 1) return;
    setIsEdit(true)
  }
  const cancelHandler = () => {
    setIsEdit(false)
    setValue(data[datakey])
  }
  if (isEdit) {
    return <input onKeyUp={updateValueHandler}
                  className={'w-auto py-0 px-2'}
                  onBlur={cancelHandler}
                  type="text"
                  value={value}
                  onChange={e => setValue(e.target.value)}/>
  }

  return (
    <span onDoubleClick={editHandler}>
      {value}
    </span>
  );
};

export default EditableSpan;
