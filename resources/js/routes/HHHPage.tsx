import React, {useEffect, useState} from "react";
import {useGetCollectionTagsQuery} from "../services/HCollectionService";
import {Outlet} from "react-router-dom";
import HCollectionFilter from "../components/HCollection/HCollectionFilter";

export const filterCollection = (collections, filter) => {
  const filteredByTitle = collections?.collections.data.filter(c => c.title_ru.toLowerCase().includes(filter.title.toLowerCase()));
  return filteredByTitle?.filter(item => {
    return filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf));
  });
};
const HHHPage = () => {

  const {data: tags, isLoading: tagsLoad} = useGetCollectionTagsQuery("");
  const [filter, setFilter] = useState({
    title: "",
    type: "anime",
    tags: []
  });
  useEffect(() => {
    if (/m$/.test(location.pathname)) {
      setFilter({...filter, type: "manga"});
    }
  }, []);

  return (
    <div className={"m-4"}>
      <div className={"bg-neutral-800 rounded-lg pt-4 flex flex-col gap-4 mt-4"}>
        <h1 className={"text-center font-bold text-2xl"}>Добро пожаловать в зону души!</h1>
        <h3 className={"text-sm text-neutral-500 italic text-end mr-2"}>
          Я не при делах если что. Все данные взяты с открытых источников.
        </h3>
        <div className={"flex flex-col gap-4"}>
          <HCollectionFilter filter={filter} setFilter={setFilter} tags={tags}/>
          <Outlet context={filter}/>
        </div>
      </div>
    </div>
  );
};

export default HHHPage;
