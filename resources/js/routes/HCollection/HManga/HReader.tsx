import React, {FC, useEffect} from "react";
import {useParams} from "react-router";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetMangaByIdQuery} from "../../../services/Collections/MangaService";

const HReader: FC = () => {
  const passkey = localStorage.getItem("passkey");
  const {id} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  const {data} = useGetMangaByIdQuery({passkey, id, type: "manga"}, {
    selectFromResult: ({data}) => ({
      data: data?.pages.find(p => p.pageNumber == searchParams.get("page")),
    })
  });
  useEffect(() => {
    if (!data) {
      nav("/NULL/m/" + id);
    }
  }, [data]);
  useEffect(() => {
    setSearchParams({page: "1"});
  }, []);

  const prevPage = () => {
    const page = searchParams.get("page");
    setSearchParams({page: String(Number(page) - 1)});
  };
  const nextPage = () => {
    const page = searchParams.get("page");
    setSearchParams({page: String(Number(page) + 1)});
  };
  return (
    <div className={"relative flex justify-center"}>
      <div className={"flex h-full w-full absolute"}>
        <div className={"back flex-1"} onClick={prevPage}/>
        <div className={"forward flex-1"} onClick={nextPage}/>
      </div>
      <img className={"xs:h-auto sm:h-screen"} src={data?.file_link} alt=""/>
    </div>
  );
};

export default HReader;
