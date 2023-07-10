import React, {FC, useState} from "react";
import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

interface QuickAdderProps {
    error: SerializedError | FetchBaseQueryError

    createFn(any): any

    length: number
    tag?: boolean
}

const QuickAdder: FC<QuickAdderProps> = ({error, createFn, length, tag}) => {
    const [value, setValue] = useState('');
    const [rx, setRx] = useState(false);
    const [errorValue, setErrorValue] = useState('');
    const createHandler = () => {
        createFn({name: value, type: rx})
            .unwrap()
            .then(() => {
                setValue('')
            })
            .catch(() => {
                setErrorValue(value)
            })
    }
    return (
        <div className={"flex flex-col"}>
            <div className={"flex gap-4"}>
                <div className={'flex gap-2 flex-1'}>
                    <input type="text" className={'w-full'}
                           placeholder={"Название тега"}
                           autoComplete={"false"}
                           value={value}
                           onChange={e => setValue(e.target.value)}/>
                    {tag &&
                        <label className={'flex items-center gap-2'}>
                            Rx?
                            <input type="checkbox" checked={rx}
                                   onChange={e => (setRx(e.target.checked))}/>
                        </label>
                    }
                </div>
                <button className={"bg-slate-700 px-8"} onClick={createHandler}>Добавить</button>
            </div>
            {error && <span className={"text-red-500 font-bold"}>"{errorValue}" уже существует</span>}
            <span>Всего элементов: {length}</span>
        </div>
    );
};

export default QuickAdder;
