import React, {useEffect} from "react";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";
import {useSearchParams} from "react-router-dom";

const Paginator = ({currentPage, setCurrentPage, totalPages}) => {
    let [searchParams, setSearchParams] = useSearchParams();
    const toPageHandler = (page) => {
        if (page > totalPages) return
        setCurrentPage(page)
        setSearchParams({page: page})
    };
    let pages: any[] = Array.from({length: totalPages}, (v, k) => k + 1);

    if (totalPages > 15) {
        const middle = () => {
            if (currentPage < 4) return ['...']
            if (currentPage === 4) return [currentPage + 1, currentPage + 2, '...']
            if (currentPage === 5) return [currentPage, currentPage + 1, '...']
            if (currentPage === 6) return [currentPage - 1, currentPage, currentPage + 1, '...']
            if (currentPage > 6 && currentPage < pages.at(-5)) return ['...', currentPage - 1, currentPage, currentPage + 1, '...']
            if (currentPage === pages.at(-4)) return ['...', currentPage - 2, currentPage - 1,]
            if (currentPage <= pages.at(-5)) return ['...', currentPage - 1, currentPage]
            return ['...']
        }
        const start = [1, 2, 3, 4]
        const end = [pages.at(-4), pages.at(-3), pages.at(-2), pages.at(-1)]
        pages = [...start, ...middle(), ...end]
    }

    useEffect(() => {
        const currentPage_search = searchParams.get('page')
        if (currentPage_search) setCurrentPage(currentPage_search)
    }, []);
    useEffect(() => {
        if (totalPages < currentPage) {
            setCurrentPage(totalPages)
        }
    }, [totalPages, currentPage]);
    return (
        <div className={"flex xs:gap-1 md:gap-4 items-center justify-center p-4"}>
          <span onClick={() => toPageHandler(1)}
                className={currentPage === 1 ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}>
              <FaAngleDoubleLeft/>
          </span>
            <span onClick={() => toPageHandler(currentPage - 1)}
                  className={currentPage === 1 ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}><FaAngleLeft/></span>
            {pages.map((page, index) =>
                <span key={index}
                      onClick={() => toPageHandler(page)}
                      className={currentPage !== page ? "cursor-pointer hover:text-neutral-500 text-neutral-300" : "text-neutral-500"}>
                      {page}
                    </span>
            )}
            <span onClick={() => toPageHandler(currentPage + 1)}
                  className={currentPage >= totalPages ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}>
                <FaAngleRight/>
            </span>
            <span
                className={currentPage === totalPages ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
                onClick={() => toPageHandler(totalPages)}>
                <FaAngleDoubleRight/>
            </span>
        </div>
    );
};

export default Paginator;
