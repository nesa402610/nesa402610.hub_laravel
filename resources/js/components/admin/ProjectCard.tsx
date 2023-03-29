import React, {useState} from "react";
// @ts-ignore
import noImage from "../../img/noimage.png";
import ProjectInfo from "../projectCard/projectInfo";
import Modal from "../UI/modal";
import ProjectModal from "./ProjectModal";

const ProjectCard = ({project}) => {
  const [isModal, setIsModal] = useState(false);
  const editProjectHandler = () => {
    setIsModal(true);
  };
  return (
    <>
      <Modal title={"Редактирование"} isOpen={isModal} onClose={setIsModal}>
        <ProjectModal id={project.id} type={"edit"} closeModalHandler={() => setIsModal(false)}/>
      </Modal>
      <div onClick={editProjectHandler}
           className={"projectCard relative flex flex-col rounded-xl overflow-hidden border-2 border-stone-500"
             + (project.status.toLowerCase() === "planned" ? " opacity-70 cursor-default planned" : ` ${project.status.toLowerCase()}`)}>
        <div className={"h-full"}>
          {project.image ? <img className={"w-full"} src={project.image} alt=""/> :
            <div className={"h-full bg-cover bg-center"} style={{backgroundImage: `url(${noImage})`}}/>}
        </div>
        <ProjectInfo project={project}/>
      </div>
    </>
  );
};

export default ProjectCard;
