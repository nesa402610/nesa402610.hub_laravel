import React, {FC} from "react";
import {BsGithub} from "react-icons/bs";
import {IProjectProps} from "../../types/Project";

const ProjectOverviewGithub: FC<IProjectProps> = ({project}) => {
  return (
    <>
      {project.github &&
        <a href={project.github}
           onClick={e => e.preventDefault()}
           className={"transition-all hover:scale-125 flex ml-2 hover:text-stone-400 ani"}>
          <BsGithub/>
        </a>
      }
    </>
  );
};

export default ProjectOverviewGithub;
