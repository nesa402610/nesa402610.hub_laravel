import React, {useState} from "react";

const ListItem = ({id, name, updateFn, tag: type}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(name);
    const [newType, setNewType] = useState(type);

    const updateHandler = (e) => {
        if (e.key === "Escape") {
            setNewName(name);
            setNewType(type)
            return setIsEdit(false);
        }
        if (e.key === "Enter" && newName.length !== 0) {
            updateFn({id: id, name: newName, type: newType});
            setIsEdit(false);
        }
    };
    if (isEdit) {
        return (
            <div className={'flex gap-2'}>
                <input type={"text"}
                       value={newName}
                       autoFocus
                       onChange={e => setNewName(e.target.value)}
                       onKeyUp={e => updateHandler(e)}/>
                {typeof type === 'number' &&
                    <select value={newType} className={'bg-slate-600 rounded-lg px-2'}
                            onChange={e => setNewType(+e.target.value)}>
                        <option value='0'>FF тег</option>
                        <option value='1'>Rx тег</option>
                        <option value='2'>Rx жанр</option>
                        <option value='3'>FF жанр</option>
                    </select>
                }
            </div>
        );
    }
    return (
        <div className={"flex bg-slate-600 p-2 rounded-lg justify-between"} onDoubleClick={() => setIsEdit(true)}>
            <span>{id}&nbsp;{name}</span>
            {(type === 0 || type === 1) &&
                <span>{type === 0 ? 'Обычный' : 'Rx'}</span>
            }
        </div>
    );
};

export default ListItem;
