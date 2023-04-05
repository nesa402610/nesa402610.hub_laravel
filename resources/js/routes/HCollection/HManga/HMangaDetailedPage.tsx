import React, {useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import HCollectionCard from "../../../components/HCollection/HCollectionCard";
import Modal from "../../../components/UI/modal";
import {useGetCollectionByIdQuery} from "../../../services/HCollectionService";

const HMangaDetailedPage = () => {
  const passkey = localStorage.getItem("passkey");
  const [page, setPage] = useState({page: null, link: ""});
  const [isModal, setIsModal] = useState(false);
  const {id} = useParams();
  const {data} = useGetCollectionByIdQuery({passkey, id, type: "manga"});

  const viewHandler = (page, link) => {
    setPage({...page, page: page});
    setPage({...page, link: link});
    setIsModal(true);
  };
  return (
    <>
      <Modal title={""} isOpen={isModal} onClose={setIsModal}>
        <img className="p-4 max-h-screen" src={page.link} alt=""/>
      </Modal>
      <div className={"m-4 flex flex-col gap-4"}>
        <HCollectionCard collection={data}/>
        <div className={"grid md:grid-cols-6 xs:grid-cols-3 gap-4 bg-neutral-700 rounded-lg p-4"}>
          {data?.pages?.map(p =>
            <Link to={`reader?page=${p.pageNumber}`} key={p.id} className={"basis-1/6"}>
              <img src={p.file_link} onClick={() => viewHandler(1, p.file_link)} alt=""/>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default HMangaDetailedPage;
