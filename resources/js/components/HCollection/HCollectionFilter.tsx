import React from "react";
import {useNavigate} from "react-router-dom";

const HCollectionFilter = ({filter, setFilter, tags}) => {
  const nav = useNavigate();
  const typeHandler = async (e) => {
    setFilter({...filter, type: e.target.value});
    if (e.target.value === "anime") {
      nav("a");
    } else {
      nav("m");
    }
  };
  return (
    <div className={"flex sm:p-4 xs:p-2 flex-col gap-4"}>
      <input type="text"
             value={filter.title}
             onChange={e => setFilter({...filter, title: e.target.value})}/>
      <div className={"flex gap-4"}>
        <select className={"bg-neutral-600 p-2 rounded-lg"}
                value={filter.type}
                onChange={e => typeHandler(e)}>
          <option value="anime">Аниме</option>
          <option value="manga">Манга</option>
        </select>
        <div className={"flex gap-1 flex-wrap items-center bg-neutral-600 w-[200px]  p-2 rounded-lg"}>
          {!filter.tags.length ? <span>Жанры</span> : ''}
          {filter.tags.map(tag =>
            <span key={tag.id}
                  onClick={() => setFilter({...filter, tags: filter.tags.filter(tagArr => tagArr !== tag)})}
                  className={"bg-neutral-800 rounded-full px-2 hover:cursor-pointer"}>{tag}</span>
          )}

          <select className={"outline-0 w-3 bg-neutral-600 rounded-lg"}
                  value=""
                  placeholder={"Жанры"}
                  onChange={e => setFilter({...filter, tags: [...filter.tags, e.target.value]})}>
            {tags?.filter(tag => !filter.tags.includes(tag.name)).map(t =>
              <option key={t.id} value={t.name}>{t.name}</option>
            )}
          </select>
        </div>
        {/*<Selector data={[1, 2, 3]} freeItems={()=>freeTagsHandler()}>*/}
        {/*  {tags?.filter(tag => !filter.tags.map(itemTag => itemTag).includes(tag.name)).map(t =>*/}
        {/*    <span>{t.name}</span>*/}
        {/*  )}*/}
        {/*</Selector>*/}

      </div>
    </div>
  );
};

export default HCollectionFilter;
