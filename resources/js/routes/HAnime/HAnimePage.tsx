import React, {FC, useEffect, useState} from "react";
import {ICollection} from "../../types/types";
import {useGetCollectionTagsQuery, useLazyGetCollectionQuery} from "../../services/HCollectionService";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import Loader from "../../components/Loader";
import Passkey from "./Passkey";
import passkey from "./Passkey";
import Paginator from "../../components/UI/Paginator";


interface HCollectionPageProps {
  filterValue?: string;
}

const HAnimePage: FC<HCollectionPageProps> = ({filterValue}) => {
  const [trigger, {data: collections, isLoading, error}] = useLazyGetCollectionQuery();
  const {data: tags, isLoading: tagsLoad} = useGetCollectionTagsQuery("");
  const [filteredCollection, setFilteredCollection] = useState<ICollection[]>(null);
  const [curPage, setCurPage] = useState(1);
  const [filter, setFilter] = useState({
    title: "",
    type: "anime",
    tags: []
  });
  useEffect(() => {
    if (collections) {
      const filteredByTitle = collections.data.filter(c => c.title_ru.toLowerCase().includes(filter.title.toLowerCase()));
      const filteredByTitleAndTags = filteredByTitle.filter(item => {
        return filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf));
      });
      setFilteredCollection(filteredByTitleAndTags);
    }
  }, [filter, collections]);


  useEffect(() => {
    const passkey = localStorage.getItem("passkey");
    if (passkey) trigger({passkey, type: filter.type});
  }, [filter.type]);

  if (isLoading || tagsLoad) return <Loader/>;
  if (!filteredCollection || !localStorage.getItem("passkey")) {
    return (
      <Passkey error={error} isLoading={isLoading} trigger={trigger}/>
    );
  }
  return (
    <div className={"m-4"}>
      <div className={"block--dark flex flex-col gap-4 mt-4"}>
        <h1 className={"text-center font-bold text-2xl"}>Добро пожаловать в зону души!</h1>
        <h3 className={"text-sm text-neutral-500 italic text-end mr-2"}>
          Я не при делах если что. Все данные взяты с открытых источников.
        </h3>
        <div className={"block--dark flex flex-col -m-4 gap-4"}>
          <div className={"flex flex-col gap-4"}>
            <input type="text"
                   value={filter.title}
                   onChange={e => setFilter({...filter, title: e.target.value})}/>
            <div className={"flex gap-4"}>
              <select className={"bg-neutral-600 p-2 rounded-lg"}
                      onChange={e => setFilter({...filter, type: e.target.value})}>
                <option value="anime">Аниме</option>
                <option value="manga">Манга</option>
              </select>
              <div className={"flex gap-1 flex-wrap items-center bg-neutral-600 min-w-[200px] p-2 rounded-lg"}>
                {filter.tags.map(tag =>
                  <span onClick={() => setFilter({...filter, tags: filter.tags.filter(tagArr => tagArr !== tag)})}
                        className={"bg-neutral-800 rounded-full px-2 hover:cursor-pointer"}>{tag}</span>
                )}

                <select className={"outline-0 w-3 bg-neutral-600 rounded-lg"}
                        value=""
                        placeholder={"Жанры"}
                        onChange={e => setFilter({...filter, tags: [...filter.tags, e.target.value]})}>
                  {tags?.filter(tag => !filter.tags.includes(tag.name)).map(t =>
                    <option value={t.name}>{t.name}</option>
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
          {filteredCollection.map(collectionItem =>
            <HCollectionCard key={collectionItem.id}
                             collection={collectionItem}/>
          )}
          <Paginator currentPage={curPage}
                     setCurrentPage={setCurPage}
                     totalPages={collections.last_page}
                     handler={trigger}/>
        </div>
      </div>
    </div>
  );
};

export default HAnimePage;
