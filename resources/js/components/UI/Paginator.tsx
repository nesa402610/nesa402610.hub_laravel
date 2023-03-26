import React from "react";
import {FaAngleDoubleLeft, FaAngleLeft, FaAngleRight} from "react-icons/fa";

const Paginator = ({currentPage, setCurrentPage, totalPages, handler}) => {
  const passkey = localStorage.getItem("passkey");
  const nextPageHandler = () => {
    if (currentPage < totalPages) {
      handler({passkey: passkey, page: currentPage + 1});
      setCurrentPage(p=>p+1)
    }
  };
  const toPageHandler = (page) => {
    handler({passkey: passkey, page: page});
    setCurrentPage(page)

  };
  const prevPageHandler = (first?: boolean) => {
    if (first) {
      if (currentPage > 1) {
        handler({passkey: passkey, page: 1});
        setCurrentPage(1)
      }

    } else {
      if (currentPage > 1) {
        handler({passkey: passkey, page: currentPage - 1});
        setCurrentPage(p=>p-1)
      }
    }
  };
  const pages = Array.from({length: totalPages}, (v, k) => k + 1);
  if (totalPages === 1) return null;
  return (
    <div className={"flex gap-4 items-center justify-center"}>
      <span className={currentPage === 1 ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
            onClick={() => prevPageHandler(true)}><FaAngleDoubleLeft/></span>
      <span className={currentPage < totalPages ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
            onClick={() => prevPageHandler()}><FaAngleLeft/></span>
      {pages.map(page =>
        <span className={currentPage !== page ? "cursor-pointer hover:text-neutral-500 text-neutral-300" : "text-neutral-500"}
              onClick={() => toPageHandler(page)}>
          {page}
        </span>
      )}
      <span className={currentPage >= totalPages ? "text-neutral-500" : "cursor-pointer hover:text-neutral-500 text-neutral-300"}
            onClick={nextPageHandler}><FaAngleRight/></span>
    </div>
  );
};

export default Paginator;
