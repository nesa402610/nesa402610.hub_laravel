import React, {useState} from "react";
import {FaTrashAlt} from "react-icons/fa";

const ListItem = ({id, name, updateFn, isRx, type, deleteFn}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState(name);
    const [rx, setRx] = useState(isRx);
    const [rotate, setRotate] = useState(false);

    const updateHandler = (e) => {
        if (e.key === "Escape") {
            setNewName(name);
            setRx(isRx)
            return setIsEdit(false);
        }
        if (e.key === "Enter" && newName.length !== 0) {
            updateFn({id: id, name: newName, rx, type: type});
            setIsEdit(false);
        }
    };
    if (isEdit) {
        return (
            <div className={'flex flex-col gap-2'}>
                <div className={'flex gap-2'}>
                    <input type={"text"}
                           value={newName}
                           autoFocus
                           onChange={e => setNewName(e.target.value)}
                           onKeyUp={e => updateHandler(e)}/>
                    {typeof isRx === 'number' &&
                        <select value={rx} className={'bg-slate-600 rounded-lg px-2'}
                                onChange={e => setRx(+e.target.value)}>
                            <option value='0'>FF тег</option>
                            <option value='1'>Rx тег</option>
                            <option value='2'>Rx жанр</option>
                            <option value='3'>FF жанр</option>
                        </select>
                    }
                </div>

                {/*<label>*/}
                {/*    Ротация*/}
                {/*    <input type="checkbox" onChange={()=>setRotate(prevState => !prevState)}/>*/}
                {/*</label>*/}
            </div>
        );
    }
    return (
        <div className={"flex bg-slate-600 p-2 rounded-lg justify-between"} onDoubleClick={() => setIsEdit(true)}>
            <span>{id}&nbsp;{name}</span>
            <div className={'flex gap-2 items-center'}>
                {(typeof isRx === "number") &&
                    <span>{isRx === 0 ? 'FF' : 'Rx'}</span>
                }
                <FaTrashAlt onClick={() => deleteFn({type, id})}/>
            </div>
        </div>
    );
};

export default ListItem;
