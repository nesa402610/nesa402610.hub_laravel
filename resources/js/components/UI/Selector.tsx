import React, {useEffect, useState} from "react";

const Selector = ({data, children, freeItems}) => {
  const [freeItems1, setFreeItems1] = useState([]);
  const [selected, setSelected] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const dropdownHandler = () => {
    setDropdown(p => !p);
  };
  useEffect(() => {
    const freeItems = data.filter(tag => !selected.map(itemTag => itemTag.name).includes(tag.name))
  }, [data]);
  return (
    <div className={"min-w-[150px] relative bg-neutral-600 p-2 rounded-lg"}
         onClick={dropdownHandler}
    >
      {dropdown &&
        <div className={"absolute top-[40px] flex flex-col bg-neutral-800 px-2 rounded-lg"}
             onClick={e => e.stopPropagation()}>
          {freeItems1.map(item =>
          <span>{item.name}</span>
          )}
        </div>
      }
    </div>
  );
};

export default Selector;
