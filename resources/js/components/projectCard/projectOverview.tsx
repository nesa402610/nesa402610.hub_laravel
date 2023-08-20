import React, {FC} from "react";
import SiteOverviewState from "./projectOverview__state";
import SiteOverviewHost from "./projectOverview__host";
import SiteOverviewLevel from "./projectOverview__level";
import ProjectOverviewGithub from "./projectOverview__github";
import {IProjectProps} from "types/Project";

const ProjectOverview: FC<IProjectProps> = ({project}) => {
  return (
    <div className={"siteOverview"} onClick={e => e.stopPropagation()}>
        <SiteOverviewState project={project}/>
        <SiteOverviewLevel project={project}/>
        <SiteOverviewHost project={project}/>
        <ProjectOverviewGithub project={project}/>
    </div>
  );
};

export default ProjectOverview;
