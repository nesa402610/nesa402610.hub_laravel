import React, {FC, useEffect} from "react";
import {useParams} from "react-router";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useGetMangaByIdQuery} from "services/Collections/MangaService";
import {useAppDispatch} from "hooks/redux";
import {setHeaderType} from "store/reducers/appSlice";

const HReader: FC = () => {
    const {id} = useParams();
    const passkey = localStorage.getItem("passkey");
    const nav = useNavigate();
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const {data} = useGetMangaByIdQuery({passkey, id, type: "manga"}, {
        selectFromResult: ({data}) => ({
            data: data?.pages.find(p => p.pageNumber == searchParams.get("page")),
        })
    });

    useEffect(() => {
        if (!searchParams) setSearchParams({page: "1"});
        dispatch(setHeaderType(1))
        return () => {
            dispatch(setHeaderType(0))
        }
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
