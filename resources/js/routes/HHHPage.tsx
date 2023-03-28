import React, {useEffect, useState} from "react";
import HCollectionFilter from "../components/HCollection/HCollectionFilter";
import Passkey from "./HAnime/Passkey";
import {useGetCollectionTagsQuery} from "../services/HCollectionService";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export const filterCollection = (collections, filter) => {
  const filteredByTitle = collections?.collections.data.filter(c => c.title_ru.toLowerCase().includes(filter.title.toLowerCase()));
  const filteredByTitleAndTags = filteredByTitle?.filter(item => {
    return filter.tags.every(tf => item.tags?.map(it => it.name).includes(tf));
  });
  return filteredByTitleAndTags;
};
const HHHPage = () => {
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState(null);
  const location = useLocation();
  const {data: tags, isLoading: tagsLoad} = useGetCollectionTagsQuery("");
  const [curPage, setCurPage] = useState(1);
  const navigate = useNavigate();
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
  if (!passkey || error) {
    return (
      <Passkey setpasskey={setPasskey} error={error} setError={setError}/>
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
          <HCollectionFilter filter={filter} setFilter={setFilter} tags={tags}/>
          <Outlet context={filter}/>
          {/*{filter.type === "anime" ?*/}
          {/*  <HAnimePage setError={setError} setCollections={setCollections} filteredCollection={filteredCollection}/> :*/}
          {/*  <HMangaPage setCollections={setCollections} filteredCollection={filteredCollection}/>}*/}
          {/*<Paginator currentPage={curPage}*/}
          {/*           setCurrentPage={setCurPage}*/}
          {/*           totalPages={filter.type === "anime" ? anime?.collections.last_page : manga?.collections.last_page}*/}
          {/*           handler={filter.type === "anime" ? 1 : 2}/>*/}
        </div>
      </div>
    </div>
  );
};

export default HHHPage;
