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
                {(type === 0 || type === 1) &&
                    <label className={'flex items-center gap-2'}>
                        Rx?
                        <input type="checkbox" checked={newType}
                               onChange={e => (setNewType(e.target.checked))}/>
                    </label>
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
