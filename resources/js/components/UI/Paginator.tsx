import React from "react";
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";

const Paginator = ({currentPage, setCurrentPage, totalPages}) => {
    const toPageHandler = (page) => {
        if (page > totalPages) return
        setCurrentPage(page)

    };
    const pages = Array.from({length: totalPages}, (v, k) => k + 1);
    if (totalPages === 1) return null;
    return (
        <div className={"flex gap-4 items-center justify-center"}>
      <span
          className={currentPage === 1 ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
          onClick={() => toPageHandler(1)}>
          <FaAngleDoubleLeft/>
      </span>
            <span
                className={currentPage === 1 ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
                onClick={() => toPageHandler(currentPage - 1)}><FaAngleLeft/></span>
            {pages.map(page =>
                <span
                    onClick={() => toPageHandler(page)}
                    className={currentPage !== page ? "cursor-pointer hover:text-neutral-500 text-neutral-300" : "text-neutral-500"}>
                      {page}
                    </span>
            )}
            <span
                className={currentPage >= totalPages ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
                onClick={() => toPageHandler(currentPage + 1)}>
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
