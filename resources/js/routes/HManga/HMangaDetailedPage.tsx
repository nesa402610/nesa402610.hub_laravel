import React, {useState} from "react";
import {useParams} from "react-router";
import {useGetCollectionByIdQuery} from "../../services/HCollectionService";
import HCollectionCard from "../../components/HCollection/HCollectionCard";
import Modal from "../../components/UI/modal";

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
        <div className={"flex gap-8 bg-neutral-700 rounded-lg p-4"}>
          {data?.pages?.map(p =>
            <div key={p.id} className={"w-[200px]"}>
              <img src={p.page_link} onClick={() => viewHandler(p.page, p.page_link)} alt=""/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HMangaDetailedPage;
