import React, {useState} from "react";

const QuickAdder = ({error, createFn, length}) => {
    const [value, setValue] = useState('');
    const [errorValue, setErrorValue] = useState('');
    const createHandler = () => {
        createFn({name: value})
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
                <input type="text"
                       placeholder={"Название тега"}
                       autoComplete={"false"}
                       value={value}
                       onChange={e => setValue(e.target.value)}/>
                <button className={"bg-slate-700 px-8"} onClick={createHandler}>Добавить</button>
            </div>
            {error && <span className={"text-red-500 font-bold"}>"{errorValue}" уже существует</span>}
            <span>Всего элементов: {length}</span>
        </div>
    );
};

export default QuickAdder;
