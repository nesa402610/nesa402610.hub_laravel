import React from "react";

const QuickAdder = ({value, error, setFn, createFn, length}) => {
  return (
    <div className={"flex flex-col"}>
      <div className={"flex gap-4"}>
        <input type="text"
               placeholder={"Название тега"}
               autoComplete={"false"}
               value={value}
               onChange={e => setFn(e.target.value)}/>
        <button className={"bg-slate-700 px-8"} onClick={() => createFn(value)}>Добавить</button>
      </div>
      {error && <span className={"text-red-500 font-bold"}>"{value}" уже существует</span>}
      <span>Всего элементов: {length}</span>
    </div>
  );
};

export default QuickAdder;
