import React, {FC, SetStateAction, useEffect, useState} from "react";
import useClickOutside from "hooks/useClickOutside";
import {useGetTagsQuery} from "services/Anime/TagService";

interface SelectorProps {
    children?: React.ReactNode
    placeholder: string
    selected: string[]
    setSelected: React.Dispatch<SetStateAction<string[]>>
}


const Selector: FC<SelectorProps> = ({children, placeholder, selected, setSelected}) => {
    const {data, isLoading} = useGetTagsQuery()
    const [freeItems, setFreeItems] = useState([]);
    const {setIsOpen, isOpen, ref} = useClickOutside()
    const dropdownHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation()
        setIsOpen(prev => !prev);
    };
    const removeItem = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, curItem: string) => {
        e.stopPropagation()
        setSelected((prev: string[]) => prev.filter((item: string) => item !== curItem))
    }
    const addItem = (item) => {
        setSelected(prev => [...prev, item.name])
    }

    useEffect(() => {
        const allItems = !isLoading ? [...data.genres, ...data.tags] : []
        const freeItems = allItems.filter(tag => !selected.map(itemTag => itemTag).includes(tag.name))
        setFreeItems(freeItems)
    }, [selected, isLoading]);
    // console.log(values)
    return (
        <div className={'flex flex-col w-full'}>
            <span>{placeholder}</span>
            <div className={"relative bg-neutral-600 p-2 rounded-lg min-h-[35px]"}
                 onClick={e => dropdownHandler(e)}
            >
                <div className={'flex flex-wrap gap-1'}>
                    {selected.map(item =>
                        <span key={item}
                              className={"bg-neutral-800 rounded-full px-2 hover:cursor-pointer whitespace-nowrap"}
                              onClick={e => removeItem(e, item)}>
                            {item}
                        </span>
                    )}
                </div>
                {isOpen &&
                    <div ref={ref}
                         className={"absolute z-50 max-h-[300px] overflow-scroll top-[40px] flex flex-col bg-neutral-700 rounded-lg border-[1px] border-neutral-400/30"}
                         onClick={e => e.stopPropagation()}>
                        {freeItems?.map(item =>
                            <span key={item.name}
                                  className={'p-2 border-b-[1px] border-neutral-500 cursor-pointer hover:bg-neutral-700'}
                                  onClick={() => addItem(item)}>
                                {item.name}
                            </span>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default Selector;
